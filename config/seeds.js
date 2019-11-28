/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */

module.exports.seeds = {

    disable: true,
    _hookTimeout: 700000,
    person: { 
        overwrite: true,
        data: [{
                'firstname': 'Oscar',
                'lastname': 'Medina',
                'email': 'me@sharepointoscar.com'
            },
            {
                'firstname': 'Ginger',
                'lastname': 'Medina',
                'email': 'ginger@sharepointoscar.com'
            }]
    },
    car: { 
        overwrite: true,
        data:[{
                'year': '2017',
                'make': 'Audi',
                'model': 'R8',
                'color': 'Red',
                'coordinates': [ -118.8091667, 34.005 ] //malibu 
            },
            {
                'year': '2012',
                'model': 'R8',
                'make': 'Audi',
                'color': 'White',
                'coordinates': [ -122.431297, 37.773972 ] // San Francisco
            },
            {
                'year': '1971',
                'model': 'Carrera',
                'make': 'Porsche',
                'color': 'Silver',
                'coordinates': [ -87.623177, 41.881832 ] // Chicago
            },
            {
                'year': '1975',
                'model': 'Carrera',
                'make': 'Porsche',
                'color': 'Red',
                'coordinates': [ -80.191788, 25.761681 ] // Miami
   
            }]
    }
    
};
