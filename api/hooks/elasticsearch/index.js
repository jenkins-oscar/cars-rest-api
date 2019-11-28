/**
 * index.js
 *
 * @description :: This hook ensures the creation of the Elasticsearch Mappings on our models
 *                 and opens a connection to Elasticsearch for use within the application. 
 */
module.exports = function(sails){

    // private methods and variables
    var elasticsearch = require('elasticsearch');
    //instantiate elasticsearch client with local config
    var client = new elasticsearch.Client(sails.config.connections.myLocalElasticsearch);
    
    return {  
        elasticClient: client,
        configure: function() {
          
        // create the elasticsearch index mapping for each of our Sails Models
        // manually for now, but we can iterate and build dynamically
        //console.log('************ CHECK SAILS MODELS HOW MANY?  ********************* ');
        // _.each(sails.models,function(model){
        //     sails.log.debug(model);
        // });
        var config = {
                index:'car-api',
                body:{
                    "settings": {
                        "number_of_shards" : 3,
                        "number_of_replicas" : 2 
                    },
                    "mappings": {
                        "car" : {
                            "properties" : {
                                "year" : { "type" : "date",format:"strict_date_optional_time" },
                                "model": {"type": 'text'},
                                "make": {"type": 'text'},
                                "color": {"type": 'text'},
                                "coordinates":{"type": "geo_point"},
                                "person": {
                                    "type": "nested" 
                                  }
                            }
                        }
                    }
                }
        };

        client.indices.exists({index:'car-api'},function(err,response,status){
            
            if(err){sails.log(JSON.stringify(err,null,2));}

            sails.log(JSON.stringify(response,null,2));
            
            //if the car-api index does not exist create it
            if(!response){
                client.indices.create(config, function(err,response){
                    if(err){sails.log(JSON.stringify(err,null,2));
                    }
                    else{
                       
                        sails.log(JSON.stringify(response,null,2));
                    }
 
                });
                
            }else{ 
                sails.log('************ INDEX CAR-API ALREADY EXISTS NOT CREATED ********************* ');
            }

        });

        },
      
      // initialize is not required, but if included
      // it must return cb();
      initialize: function(cb) {    

        this.configure();
        return cb();
        
      }
    }   
}