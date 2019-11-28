/**
 * Car.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
 
  connections:['localMongodbServer','myLocalElasticsearch'],
  attributes: {
		year: {
			type: 'datetime'
    },
    model: {
			type: 'string'
    },
    make: {
      type: 'string',
      enum: ['Audi', 'Porsche', 'Ferrari','Maserati','Aston Martin','Lamborghini','Lotus','McLaren']
    },
    color: {
      type: 'string'
    },
    photo:{
      type:'binary'
    },
    coordinates: {
      type: 'json',
      required: false
    },
    // this car has one owner
    owner: {
      model: 'person'
    }
  },  
  afterCreate: function (car, callback){
 
    sails.log("NEW CAR: "+JSON.stringify(car,null,2));
    sails.log("IS ELASTIC ENABLEDED: "+ process.env.ENABLE_ELASTICSEARCH);
      if(process.env.ENABLE_ELASTICSEARCH == true){
        var DSLQuery ={
          index: 'car-api',
          type: 'car',
          id: car.id,
          body: JSON.stringify(car)
        };
        sails.hooks.elasticsearch.elasticClient.create(DSLQuery,function(err,response){
          if(err){sails.log("elastic search response err: "+ JSON.stringify(err,null,2));}
    
          sails.log(response);
    
        });
    }


    callback();
  },
  afterUpdate: function (car, callback){
 
    sails.log("UPDATED CAR: "+JSON.stringify(car,null,2));

    // handle if there is an owner for this car
    // on this update operation
    if(car.owner && process.env.ENABLE_ELASTICSEARCH == true) {
      var _carOwner = {};
      Person.findOne(car.owner)
      .exec(function (err, p){
  
          if (err) return callback(err);
          _carOwner =  {"person":p};
          sails.log('found person:' + JSON.stringify(p,null,2));
  
          sails.log(_carOwner);
          _.remove(car,"owner");
          _updatedCar = { doc: _.extend(car,_carOwner)};

          var DSLQuery ={
            index: 'car-api',
            type: 'car',
            id: car.id,
            body: JSON.stringify(_updatedCar)
          };
          
          sails.log(DSLQuery);
  
          sails.hooks.elasticsearch.elasticClient.update(DSLQuery,function(err,response){
          if(err){sails.log("UPDATE elastic search response err: "+ JSON.stringify(err,null,2));}
  
          sails.log(response);
         
        });
      });
    }else {
      
      // no owner specified but other metadata might have changed, so update.
      sails.log('car owner not specified, updating other car props');
    }

    callback();
  },
  afterDestroy: function (value, callback){
    //this.destroyIndex(value.id, callback)
  },


  // Custom validation messages
  // (available for use in this model's attribute definitions above)
  validationMessages: {
    model: {
      in: 'Invalid car model option.  Not within allowed values.'
    },
    make: {
      in: 'Invalid car make option.  Not within allowed values.'
    }
  }

};

