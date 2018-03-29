const foodlist = require("./foodlist.json")
const db = require("./index");
const foodnames = foodlist.map((food) => { return {
    name: food.name,
    food_group: food.food_group 
}})


foodnames.forEach(food => {
    if (food.food_group === "Fruits" ||food.food_group === "Herbs and Spices" ||food.food_group === "Nuts" ||food.food_group === "Cereals and cereal products"||food.food_group === "Vegetables"||food.food_group === "Gourds"||food.food_group === "Soy"||food.food_group === "Pulses") {
        console.log("vegan:" ,food)

        db.any("INSERT INTO foods (food_name, isVegeterian, isVegan) VALUES ($1, $2, $3);", [food.name,true,true])
            .then(() => {
                console.log('inserted')
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        console.log("notvegan:",food)
        db.any("INSERT INTO foods (food_name, isVegeterian, isVegan) VALUES ($1,$2, $3);", [food.name, false, false])
            .then(() => {
                console.log('inserted')
            })
    }
});

// console.log(foodnames)