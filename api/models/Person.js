/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connections:['localMongodbServer','myLocalElasticsearch'],
  attributes: {

    email: {
        type:'email',
        unique: true
    },
    firstname: {
      type: 'string',
    	required: true,
    },
    lastname: {
      type: 'string',
    	required: true,
    },
    picture: {
      type:'binary'
    },
    // all the cars this person owns
    cars: {
      collection: 'car',
      via: 'owner'
    }
  },
  afterCreate: function (person, callback){
   
  },
  afterUpdate: function (value, callback){
    //this.updateIndex(value.id, value, callback)
  },
  afterDestroy: function (value, callback){
    //this.destroyIndex(value.id, callback)
  }

};

