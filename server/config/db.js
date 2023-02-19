import mongoose from "mongoose";

export const dbConnect = () => {
    mongoose.connect(process.env.MONGO_CONN)
    .then(() => {
        console.log("Mongo is now Connected");
    }).catch((err) => {
        console.log(err);
    })
}