import mongoose from "mongoose";

const DBConnect = async()=>{
    try{

        await mongoose.connect(process.env.MONGO_DB_URI).then((connection)=>{
            console.log("DB Connection established");
        });
      

    }catch(err){
        console.error("Error in DB Connection "+err);
    }
}

export default DBConnect;