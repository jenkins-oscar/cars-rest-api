/**
 * CarController
 *
 * @description :: Server-side logic for managing Cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // Override the Sails built-in action for this Controller (only this one is overridden)
    create: function (req, res) {
     
         var car = {
            year: req.param('year'),
            model: req.param('model'),
            make: req.param('make'),
            color: req.param('color')
        };

        Car.create(car)
            .exec(function(err, model) {
                if (err) {
                    if (err.invalidAttributes){
                        return res.json(422, {validationErrors: err.Errors});
                      }
                }
                else {
    
                    sails.log.silly('res.ok() :: Sending 200 ("OK") response.  Car created successfully.');
                    res.json(200,model);
                }
            });
    }, 
    find: function(req,res){
     
        Car.find().
        populate('owner')
        .exec(function(err,foundRecords){
            if(err) {res.negotiate(err);}
            console.log('CarController:find() returning cars found....');
            return res.json(foundRecords);

        });
    },
    findOne: function(req,res){
        var _carId = req.param('id');

        if (_.isEmpty(_carId)){return res.badRequest();}

        Car.find({id:_carId}).
        populate('owner')
        .exec(function(err,foundRecord){
            if(err) {res.negotiate(err);}
            console.log('CarController:findOne() returning car by id....');
            return res.json(foundRecord);

        });
    }   
};

