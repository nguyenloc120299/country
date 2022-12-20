const mongoose = require("mongoose");

const country = new mongoose.Schema(
   {
      searchName: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      iso: {
         type: String,
         required: true,
      },
      areaId: {
         type: Number,
         required: true,
      },
   },
   {
      collection: "country",
   }
);

const province = new mongoose.Schema(
   {
      parentName: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      parentId: {
         type: Number,
         required: true,
      },
      areaId: {
         type: Number,
         required: true,
      },
   },
   {
      collection: "province",
   }
);
const cities = new mongoose.Schema(
   {
      parentId: {
         type: Number,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      areaId: {
         type: Number,
         required: true,
      },
   },
   {
      collection: "cities",
   }
);

const Country = mongoose.model("country", country);
const Province = mongoose.model("province", province);
const Cities = mongoose.model("cities", cities);
module.exports = { Country, Province, Cities };
