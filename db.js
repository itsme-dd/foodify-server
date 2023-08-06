const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
dotenv.config();

const mongoURI=process.env.MONGO_URI;
mongoose.set('strictQuery', true);
const mongoDB=async ()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
        if(err) console.log(err);
        else{
            console.log('Database connected');
            const fetched_data=mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                const fetched_catData=await mongoose.connection.db.collection("food_category");
                fetched_catData.find({}).toArray(function (err,catData){
                    if(err) console.log(err)
                    else {
                        global.fooditems=data;
                        global.foodcategory=catData;
                        
                    } 
                })
                
            })
        }
    })
}

module.exports=mongoDB;