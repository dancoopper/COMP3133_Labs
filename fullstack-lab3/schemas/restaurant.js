const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantsSchema = new Schema({
    address: {
        building: String,
        street: String,
        zipcode: String,
    },
    city: String,
    cuisine: String,
    name: String,
    restaurant_id: String,
});

module.exports = mongoose.model("Restaurant", restaurantsSchema, "Restaurants");