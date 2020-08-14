const { nextTick } = require('process');
const { debug } = require('console');

/**
 * index.js
 *
 * @description :: This hook ensures the creation of the Elasticsearch Mappings on our models
 *                 and opens a connection to Elasticsearch for use within the application. 
 */
module.exports = function(sails) {


    const { Client } = require('@elastic/elasticsearch')
    const client = new Client({ node: 'http://localhost:9200',log:'trace' });

    return {  
        elasticClient: client,
        configure: function(cb) {
            
            var _car_index = {
                index:"car",
                body:{
                    "mappings" : {
                        "properties":{
                            "year" : {"type" : "date" },
                            "model": {"type": "keyword"},
                            "make":  {"type": "keyword"},
                            "color": {"type": "text"},
                            "coordinates":{"type": "geo_point"}
                        }
                    }
                }

            };
            var _person_index = {
                index:"person",
                body:{
                    "mappings" : {
                        "properties":{   
                            "firstname": {"type": "keyword"},
                            "lastname":  {"type": "keyword"},
                            "email": {"type": "text"},
                            "id":{"type": "text"}
                        }
                    }
                }

            };
            var config = {
                    index: "car",
                    body:{
                        "mappings": {
                            "_doc" : {
                                "properties" : {
                                    "type": { "type": "keyword" },
                                    "year" : { "type" : 'date',"format": "yyyy" },
                                    "model": {"type": 'text'},
                                    "make": {"type": 'text'},
                                    "color": {"type": 'text'},
                                    "coordinates":{"type": "geo_point"},
                                    "firstname": { "type": "text" },
                                    "lastname":  { "type": "text" },
                                    "email":     { "type": "keyword" },
                                    "_owner_id": {"type": "keyword"}
                                    
                                }
                            }
                        }
                    }
            };
            async function setupIndex () {

                const _carIndexExists = await client.indices.exists({index:'car'});
                const _personIndexExists = await client.indices.exists({index:'person'});

                if (_carIndexExists.body == false) {

                    sails.log('************  car index does not exist, creating... *********************');
                    const _indexCarCreated = await client.indices.create(_car_index)

                    if(_indexCarCreated.statusCode == 200){
                        
                        sails.log('************  CAR INDEX CREATED!  *********************',JSON.stringify(_indexCarCreated.meta,null,2)); 

                    }

                }
                if(_personIndexExists.body == false) {

                    const _indexPersonCreated = await client.indices.create(_person_index)
                    if(_indexPersonCreated.statusCode == 200) {

                        sails.log('************  PERSON INDEX CREATED!  *********************',JSON.stringify(_indexPersonCreated.meta,null,2));   
                    }
                }

            }

            setupIndex().then(() => {
                sails.log('finished setting up index...');
            })
            .catch(console.log);
             
     },

      
      // initialize is not required, but if included
      // it must return cb();
      initialize: function(cb) {    

       
        this.configure();
        return cb();
        
      }
    }   
}