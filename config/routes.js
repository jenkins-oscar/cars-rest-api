/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage',
    cors: {
        origin: '*'    
     }
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  //'POST /graphql': 'GraphQLController.index',

  'POST /textwidget' : 'TextwidgetController.getText',

  'GET /person': {
    controller: 'PersonController',
    action: 'getAll',
    skipAssets: 'true',
    //swagger path object
    swagger: {
        methods: ['GET'],
        summary: 'Get all Person objects',
        description: 'Retrieves all Person objects with appropriate metadata',
        produces: [
            'application/json'
        ],
        tags: [
            'Person'
        ],
        responses: {
            '200': {
                description: 'List all Person objects',
                schema: 'Person', // api/model/Person.js
                type: 'array'
            }
        },
        parameters: [
            'Person' // api/model/Person.js
        ]
    }
  },
  'GET /person/:id': {
    controller: 'CarController',
    action: 'findOne',
    skipAssets: 'true',
    //swagger path object
    swagger: {
        methods: ['GET'],
        summary: ' Get a specific Person ',
        description: 'Gets a specific Person by id',
        produces: [
            'application/json'
        ],
        tags: [
            'Person'
        ],  
        responses: {
            '200': {
                description: 'returns a specific Person',
                schema: 'Person' // api/model/Car.js,
            }
        },
        parameters: ['id']

      }
  },
  'POST /person': {
    controller: 'PersonController',
    action: 'create',
    skipAssets: 'true',
    //swagger path object
    swagger: {
        methods: ['POST'],
        summary: 'Create Person ',
        description: 'Create Person with appropriate metadata',
        produces: [
            'application/json'
        ],
        tags: [
            'Person'
        ],
        responses: {
            '200': {
                description: 'Create a Person',
                schema: 'Person' // api/model/Person.js
            }
        },
        parameters: [
            'Person' // api/model/Person.js
        ]
    }
  },
  'PUT /person/:id': {
    controller: 'PersonController',
    action: 'update',
    skipAssets: 'true',
    //swagger path object
    swagger: {
        methods: ['PUT'],
        summary: 'Update Person values ',
        description: 'Update Person',
        produces: [
            'application/json'
        ],
        tags: [
            'Person'
        ],
        responses: {
            '200': {
                description: 'Updated a Person',
                schema: 'Person' // api/model/Person.js
            }
        },
        parameters: [
            'Person' // api/model/Person.js
        ]
    }
  },
  'DELETE /person/:id': {
    controller: 'PersonController',
    action: 'deleteOne',
    skipAssets: 'true',
    //swagger path object
    swagger: {
        methods: ['DELETE'],
        summary: 'Delete a Person ',
        description: 'Delete Person',
        produces: [
            'application/json'
        ],
        tags: [
            'Person'
        ],
        responses: {
            '200': {
                description: 'Deleted a Person',
                schema: 'Person' // api/model/Person.js
            }
        },
        parameters: [
            'Person' // api/model/Person.js
        ]
    }
  },

  'GET /car': {
    controller: 'CarController',
    action: 'find',
    skipAssets: 'true',
    //swagger path object
    swagger: {
        methods: ['GET'],
        summary: ' Get Cars ',
        description: 'Get all Cars',
        produces: [
            'application/json'
        ],
        tags: [
            'Cars'
        ],
        responses: {
            '200': {
                description: 'List all Cars',
                schema: 'Car', // api/model/Car.js,
                type: 'array'
            }
        },
        parameters: []

      }
  },
  'GET /car/:id': {
    controller: 'CarController',
    action: 'findOne',
    skipAssets: 'true',
    //swagger path object
    swagger: {
        methods: ['GET'],
        summary: ' Get a specific Car ',
        description: 'Gets a specific Car by id',
        produces: [
            'application/json'
        ],
        tags: [
            'Cars'
        ],  
        responses: {
            '200': {
                description: 'returns a specific Car',
                schema: 'Car' // api/model/Car.js,
            }
        },
        parameters: ['id']

      }
  },
  'POST /car': {
    controller: 'CarController',
    action: 'create',
    skipAssets: 'true',
    //swagger path object
    swagger: {
        methods: ['POST'],
        summary: 'Create Car ',
        description: 'Create Car with appropriate metadata',
        produces: [
            'application/json'
        ],
        tags: [
            'Cars'
        ],
        responses: {
            '200': {
                description: 'Create a Car',
                schema: 'Car' // api/model/Car.js
            }
        },
        parameters: [
            'Car' // api/model/Car.js
        ]
    }
  },    
  'PUT /car/:id': {
    controller: 'CarController',
    action: 'update',
    skipAssets: 'true',
    //swagger path object
    swagger: {
        methods: ['PUT'],
        summary: 'Update Car values ',
        description: 'Update Car',
        produces: [
            'application/json'
        ],
        tags: [
            'Cars'
        ],
        responses: {
            '200': {
                description: 'Updated a Car',
                schema: 'Car' // api/model/Car.js
            }
        },
        parameters: [
            'Car' // api/model/Car.js
        ]
    }
  }
};
