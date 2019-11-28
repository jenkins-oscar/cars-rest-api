// config/hooks.js

// Here you can disable various hooks.  For the car-api
// app, this is where we disable elasticsearch feature.
// false = no elasticsearch
// true = use elasticsearch
module.exports.hooks = {

    elasticsearch: process.env.ENABLE_ELASTICSEARCH,
    seeds: process.env.DISABLE_SAILS_SEED // True indicates disabled
};