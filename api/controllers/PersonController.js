/**
 * PersonController
 *
 * @description :: Server-side logic for managing people
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {

        var person = {
            firstname: req.param('firstname'),
            lastname: req.param('lastname'),
            email: req.param('email')
        };

        Person.create(person)
        .exec(function(err, model) {
            if (err) {
                if (err.invalidAttributes){
                    return res.json(422, {validationErrors: err.Errors});
                  }
            }
            else {

                console.log('PersonController:create() success!');
                res.json(200,model);
            }
        });
    },
    getAll: function(req,res){

        Person.find()
        .populate('cars')
        .exec(function(err,foundRecords){
            if(err) {res.negotiate(err);}
            console.log('PersonController:find() returning people found....');
            return res.json(foundRecords);
        });
    },
    findOne: function(req,res){
        var _personId = req.param('id');

        if (_.isEmpty(_personId)){return res.badRequest();}

        Person.find({id:_personId}).
        populate('cars')
        .exec(function(err,foundRecord){
            if(err) {res.negotiate(err);}
            sails.log('PersonController:findOne() returning person by id....');
            return res.json(foundRecord);

        });
    },
    deleteOne: function(req,res){
        var _personId = req.param('id');
        if (_.isEmpty(_personId)){return res.badRequest();}

        Person.destroy({id:_personId})
        .exec(function(err,foundRecord){

            if(err) {res.negotiate(err);}

            sails.log('PersonController:deleteOne() deleting person by id....');
            return res.json(foundRecord);
        });

    }

};

