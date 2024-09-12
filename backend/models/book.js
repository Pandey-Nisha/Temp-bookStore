import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    }
})

const Book = new mongoose.model('book', bookSchema);

export default Book;