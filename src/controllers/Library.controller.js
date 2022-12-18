'use strict';

const Book = require('../models/Library.model');

exports.findAll = function(req, res) {
  Book.findAll(function(err, book) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', book);
    res.send(book);
  });
};


exports.create = function(req, res) {
    const new_book = new Book(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length !== 3){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Book.create(new_book, function(err, book) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Book added successfully!",data:book});
        });
    }
};


exports.search = function(req, res) {
    Book.search(req.body, function(err, book) {
        if (err)
            res.send(err);
        if(book[0])
            res.json(book);
        else
            res.status(404).send({ error:true, message: 'Search Query not Found.' });
    });
};


exports.delete = function(req, res) {
  Book.delete( req.body, function(err, book) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Book successfully deleted' });
  });
};