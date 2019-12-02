var express = require('express');

var routes = function(Book){
    var bookRouter = express.Router();
    bookRouter.route('/Books')
              .post(function(req, res){
                  var book = new Book(req.body);
                  book.save();
                  res.status(201).send(book);
               })
              .get(function(req,res){
                var query = {};
                if(req.query.genre)
                {
                  query.genre = req.query.genre;
                }
                Book.find(query, function(error, books){
                      if(error)
                        res.status(500).send(error);
                      else
                        res.json(books);
                  })
              });
    
        bookRouter.use('/Books/:BookId', function(req, res, next){
            Book.findById(req.params.BookId, function(error, book){
                if(error)
                  res.status(500).send(error);
                else if(book)
                {
                    req.book = book;
                    next();
                }
                else
                {
                     res.status(404).send('no book found');
                }
            });
        });

        bookRouter.route('/Books/:BookId')
              .get(function(req,res){
                  res.json(req.book);
              })
              .put(function(req,res){
                       req.book.title = req.body.title;
                       req.book.author = req.body.author;
                       req.book.genre = req.body.genre;
                       req.book.read = req.body.read;
                       req.book.save(function(error){
                        if(error)
                           res.status(500).send(error);
                        else
                          res.json(req.book);
                    })
              })
              .patch(function(req,res){
                  if(req.body._id)
                  {
                      delete req.body._id;
                  }
                  for(var p in req.body)
                  {
                      req.book[p] = req.body[p];
                  }
                  req.book.save(function(error){
                      if(error)
                         res.status(500).send(error);
                      else
                        res.json(req.book);
                  })
              })
              .delete(function(req, res){
                  req.book.delete(function(error){
                      if(error)
                         res.status(500).send(error);
                    else
                         res.status(204).send('Removed');
                  })
              });
              return bookRouter;
};

module.exports = routes;