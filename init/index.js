const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URl = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to db");
}).catch(err => {
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URl);
}

const initDB = async () => {
    await Listing.deleteMany({});
   
    initData.data = initData.data.map((obj) => ({...obj, Owner:'67da81dcf17511b7233d946e' }));
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
}

initDB();