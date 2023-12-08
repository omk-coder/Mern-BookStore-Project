import mongoose from "mongoose";

const bookSchema  = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishYear:{
        type:String,
        required:true
    },
    url:{
        type:String,
    required:true
 },
}, //Now adding another object for the day and time
{
    timestamps:true,
}
);

//here we have expoeted schema into model cuz schema is just an structure define we need to use schema into another component as well for that we use model
export const Book = mongoose.model("Book", bookSchema);
