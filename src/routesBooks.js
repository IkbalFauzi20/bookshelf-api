/* eslint-disable linebreak-style */
const {
  // eslint-disable-next-line max-len
  addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deletedBookByIdHandler,
} = require('./handlerBooks');

const routesBooks = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deletedBookByIdHandler,
  },
];

module.exports = routesBooks;