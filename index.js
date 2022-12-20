// var axios = require("axios");
// var MongoClient = require("mongodb").MongoClient;
// var url =
//    "mongodb+srv://root:root@address.tzrnqde.mongodb.net/?retryWrites=true&w=majority";

// MongoClient.connect(url, async function (err, db) {
//    if (err) throw err;
//    var dbo = db.db("address");

//    const cities = await dbo.collection("province").find({}).toArray();

//    for (let index = 0; index < cities.length; index++) {
//       const element = cities[index];
//       const data = await axios.get(
//          `https://expressexport.alibaba.com/shipping/common/queryCityList.jsonp?json=%7B%22locale%22%3A%22VN%22%2C%22provinceId%22%3A${element.areaId}%7D&ctoken=74mrm2coifiu&_tb_token_=7e65ebbe338db`
//       );
//       if (data.data.data.length) {
//          dbo.collection("cities").insertMany(
//             data.data.data,
//             function (err, res) {
//                if (err) throw err;
//                console.log("1 document inserted");
//             }
//          );
//       }
//    }
// });

// Load express module
const express = require("express");
const cors = require("cors");
const { Country, Province, Cities } = require("./models");
// Initialize app
const app = express();

app.use(express.json());
app.use(
   cors({
      origin: "*",
   })
);
// Mongoose connection
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://root:root@address.tzrnqde.mongodb.net/address");
const db = mongoose.connection;

// Check for DB connection
db.once("open", function () {
   console.log("Connected to MongoDB successfully!");
});
db.on("error", function () {
   console.log(err);
});

// Route for home
app.get("/", function (req, res) {
   res.send("hello world");
});

app.get("/address", async (req, res) => {
   const { iso, province, cities } = req.query;

   let data = [];
   const addCountry = await Country.find();
   data = addCountry;

   if (iso) {
      const country = await Country.find({
         iso: { $regex: iso },
      });
      data = country;
   }

   if (province) {
      const addProvince = await Province.find({
         parentId: province,
      });
      data = addProvince;
   }

   if (cities) {
      const addCities = await Cities.find({
         parentId: cities,
      });
      data = addCities;
   }

   return res.status(200).json({ status: 200, message: true, data: data });
});

// Start server with port 3000
app.listen(3000, function () {
   console.log("Server started on localhost:9999");
});

