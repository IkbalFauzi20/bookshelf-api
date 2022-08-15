/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    // eslint-disable-next-line max-len
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name !== undefined) {
    const bookName = books.filter((n) => n.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: bookName.map((n) => ({
          id: n.id,
          name: n.name,
          publisher: n.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  if (reading !== undefined) {
    if (reading === '0') {
      const bookUnread = books.filter((n) => n.reading === false);
      const response = h.response({
        status: 'success',
        data: {
          books: bookUnread.map((n) => ({
            id: n.id,
            name: n.name,
            publisher: n.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
    if (reading === '1') {
      const bookRead = books.filter((n) => n.reading === true);
      const response = h.response({
        status: 'success',
        data: {
          books: bookRead.map((n) => ({
            id: n.id,
            name: n.name,
            publisher: n.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
  }
  if (finished !== undefined) {
    if (finished === '0') {
      const bookUnfinished = books.filter((n) => n.finished === false);
      const response = h.response({
        status: 'success',
        data: {
          books: bookUnfinished.map((n) => ({
            id: n.id,
            name: n.name,
            publisher: n.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
    if (finished === '1') {
      const bookFinished = books.filter((n) => n.finished === true);
      const response = h.response({
        status: 'success',
        data: {
          books: bookFinished.map((n) => ({
            id: n.id,
            name: n.name,
            publisher: n.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
  }
  const response = h.response({
    status: 'success',
    data: {
      books: books.map((n) => ({
        id: n.id,
        name: n.name,
        publisher: n.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const finished = (pageCount === readPage);
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deletedBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  // eslint-disable-next-line max-len
  addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deletedBookByIdHandler,
};