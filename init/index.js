const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URl = "mongodb+srv://tejuashu8765:3qMCVmkQIlkXZOGe@cluster0.tknnmdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
   
    initData.data = initData.data.map((obj) => ({...obj, Owner:'67e651a7140247d05788b85f' , category:"Mountain"}));
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
}

initDB();