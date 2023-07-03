const mongoose = require("mongoose");
require("dotenv").config()
const mongoUrL =
  `mongodb://${process.env.USER}:${process.env.API_KEY}@ac-gxwkajc-shard-00-00.xst1xxc.mongodb.net:27017,ac-gxwkajc-shard-00-01.xst1xxc.mongodb.net:27017,ac-gxwkajc-shard-00-02.xst1xxc.mongodb.net:27017/FoodMunchMern?ssl=true&replicaSet=atlas-ktp4bn-shard-0&authSource=admin&retryWrites=true&w=majority`;
const mongoDB = async () => {
  await mongoose.connect(
    mongoUrL,
    { useNewUrlparser: true },
    async (err, result) => {
      if (err) console.log(err);
      else {
        console.log("Connected");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "food_category"
          );
          foodCategory.find({}).toArray(function (err, catData) {
            if (err) console.log(err);
            else {
              global.food_items = data;
              global.foodCategory = catData;
              // console.log(catData)
            }
          });
          // if(err) console.log(err);
          // else
          // {
          //   global.food_items = data;
          // }
        });
      }
    }
  );
};

module.exports = mongoDB;
