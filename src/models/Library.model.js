'user strict';
var dbConn = require('../../config/db.config');

//Book object create
var Book = function(book){
    this.book_name     = book.book_name;
    this.author_name   = book.author_name;
    this.pages         = book.pages;
};
Book.create = function (newBook, result) {
    dbConn.query("INSERT INTO book set ?", newBook, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Book.search = function (bookDetail, result) {
    dbConn.query("Select * from book where book_name = ? and author_name = ?", [bookDetail.book_name,bookDetail.author_name], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Book.findAll = function (result) {
    dbConn.query("Select * from book", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('books : ', res);  
            var data = JSON.parse(JSON.stringify(res))
            if(data[0])
                result(null, res);
            else
                result(null, "No Data Available in DataBase.");
        }
    });   
};
Book.delete = function(bookDetail, result){
     console.log("Delete: ", bookDetail);
     dbConn.query("DELETE FROM book WHERE book_name = ? and author_name = ?", [bookDetail.book_name, bookDetail.author_name], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log("Delete: ", res);
            result(null, res);
        }
    }); 
};

module.exports= Book;