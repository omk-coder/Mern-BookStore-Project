import express from 'express';
import {Book} from '../model/bookModel.js';

const router = express.Router();

//so instead of app which is defined in index.js we use router

//POST is used to send data to a server to create and save in the database
//working with mongoose is an async process

//removed books from url cuz already mentioned /books in the middleware by default
router.post("/",async (req, res) => {
    try{ //first we validate if all fields are their or not
        if(!req.body.title || 
            !req.body.author|| 
            !req.body.publishYear || !req.body.url){
                res.status(400).send("Please provide all the fields: title, author,publishYear, url");
            }

             //After validation we create variable
            const newBook = {
                title:req.body.title,
                author:req.body.author,
                publishYear:req.body.publishYear,
                url:req.body.url
            }

            const book = await Book.create(newBook);
            return res.status(201).send(book)
    }  //by the end we created an new book and saved successfully in the database
   
    catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
})

//Route for GET all books from database 
 router.get('/', async (req, res) => {
    try {  //Book.find method is used to find books from database and here we get all books
        const allBook = await Book.find({})
        res.status(200).json({
            count: allBook.length,      //allows us to store in more organize way
            data:allBook
        });
    }
    catch{(err) => {
        res.status(500).send(err.message);
    } }
 })


 //Route for GET one books from database by id
 router.get('/:id', async (req, res) => {
    try {  //Book.find method is used to find books from database and here we get all books
        const {id} = req.params;

        const bookbyId = await Book.findById(id)

        return res.status(200).json(bookbyId)
    }
    catch{(err) => {
        res.status(500).send(err.message);
    } }
 })

 //req.params and req.body both read and extract data which is provide from the user and send to the database


//Route for update a book
 router.put('/:id', async (req, res) => {
    try{ //validation
        if(!req.body.title || 
            !req.body.author|| 
            !req.body.publishYear){
                res.status(400).send("Please provide all the fields: title, author,publishYear");
            }  //require id and req.body
          const {id} = req.params;
          const result  = await Book.findByIdAndUpdate(id, req.body);  
            if(!result){
                return res.status(404).send("Book not found");
               }
              return  res.status(200).send({message: "book updated successfully"})
        }
    catch{(err) => {
        res.status(500).send(err.message);
    } }

})

//Route for delete a book
router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send("Book not found");
        }
        return  res.status(200).send({message: "book deleted successfully"})
    }
    catch{(err) => {
        res.status(500).send(err.message);
    } }
})

//now this is for simple model lets assume that we have many model then more route to handle routes we use express routes

export default router;
//Now we will use this router as a middleware in index.js
