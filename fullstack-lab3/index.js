const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("./schemas/restaurant");

mongoose.connect("mongodb+srv://mongodbcomzombie391_db_user:N9dsjY99diKUiSox@assignment1.aenlzmj.mongodb.net/RestaurantsDB?appName=Assignment1");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

/* TODO:    5. Create REST API to return all restaurant details by cuisine • Select all the columns
Example: http://localhost:3000/restaurants/cuisine/Italian
*/
/* TODO:    6. Create REST API to return the 
        • The selected columns must include id, cuisines, name, city, resturant_id
        • The sorting by the restaurant_id in Ascending or Descending Order based on parameter passed.
Example: http://localhost:3000/restaurants?sortBy=asc
*/


/* TODO: Create REST API to return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
    • The selected columns must include cuisines, name and city, but exclude id
    • The sorting order must be Ascending Order on the name
Example: http://localhost:3000/restaurants/Delicatessen
*/

const app = express();
app.use(express.json());

app.get("/restaurants", (req, res) => {
    const sortBy = req.query.sortBy;

    if (sortBy) {
        // TODO 6: Sort by restaurant_id and select specific columns
        const sortOrder = sortBy.toLowerCase() === "asc" ? 1 : -1;
        Restaurant.find()
            .select("cuisine name city restaurant_id")
            .sort({ restaurant_id: sortOrder })
            .then((restaurants) => {
                res.json(restaurants);
            })
            .catch(err => res.status(500).send(err));
    } else {
        // Default behavior: return all details
        Restaurant.find()
            .then((restaurants) => {
                res.json(restaurants);
            })
            .catch(err => res.status(500).send(err));
    }
});

app.get("/restaurants/cuisine/:cuisine", (req, res) => {
    Restaurant.find({ cuisine: req.params.cuisine })
        .then((restaurants) => {
            res.json(restaurants);
        })
        .catch(err => res.status(500).send(err));
});



app.get("/restaurants/Delicatessen", (req, res) => { // get all restaurants with the cuisine Delicatessen and city not equal to Brooklyn sorted by name in ascending order
    Restaurant.find({ cuisine: "Delicatessen", city: { $ne: "Brooklyn" } }).sort({ name: 1 }).then((restaurants) => {
        res.json(restaurants);
    });
});


///////////////////////////////////////////////////
app.post("/restaurants", (req, res) => {
    const restaurant = new Restaurant(req.body);
    restaurant.save().then((restaurant) => {
        res.json(restaurant);
    });
});

app.delete("/restaurants/:id", (req, res) => {
    Restaurant.findByIdAndDelete(req.params.id).then((restaurant) => {
        res.json(restaurant);
    });
});

app.put("/restaurants/:id", (req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, req.body).then((restaurant) => {
        res.json(restaurant);
    });
});
///////////////////////////////////////////////////

app.listen(3000, () => {
    console.log("Server started on port 3000");
});