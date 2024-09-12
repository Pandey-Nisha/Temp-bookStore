import errorHandlerClass from "../middleware/errorHandlerClass.js";
import bookModel from "../models/book.js";
import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();


export async function handlePostRoute(req, res, next) {
  try {

    const image_filename = `${req.file.filename}`;
    const { name, description, price, category, author } = req.body;

    if (!name || !description || !price || !category || !author || !image_filename) 
    {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const book =  new bookModel({
        name,
        description,
        price,
        image: `/images/${image_filename}`,
        category,
        author,
    });

    const booklist =await book.save();
    console.log(booklist);
    
    res.status(201).json({msg : "booklist added successfully"});
  } catch (error) {
    next(new errorHandlerClass(error));
  }
}

export async function listBooks(req, res, next) {
  try {
    const books = await bookModel.find({});
    res.status(200).json({success: true, data: books});
  } catch (error) {
    console.log(error);
    res.status(400).json({success:false, error: error.message});
  } 
}

export async function removeBook(req, res, next) {
  try {     
    const book = await bookModel.findById(req.params.id);
    fs.unlink(`uploads/${book.image}`, () => {
      console.log("deleted image");
      
    })
    await bookModel.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, message: "Removed"});
  } catch (error) {
    console.log(error);
    res.status(404).json({success: false, error: error.message}); 
  }
}


