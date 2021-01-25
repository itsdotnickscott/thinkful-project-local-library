/**
 * The home page of the library databse.
 *
 * @author Nick Scott.
 * @since  1.25.2021
 */

const {findAuthorById} = require('./books');

/**
 * Counts the total number of books.
 * 
 * @param   {Object[]}  books An array of books.
 * @returns {number}    The number of book objects inside of the array.
 */
function totalBooksCount(books) {
  return books.length;
}

/**
 * Counts the total number of accounts.
 * 
 * @param   {Object[]}  accounts  An array of accounts.
 * @returns {number}    The number of account objects inside of the array.
 */
function totalAccountsCount(accounts) {
  return accounts.length;
}

/**
 * Counts the total number of borrowed books.
 * 
 * @param   {Object[]}  books An array of books. 
 * @returns {number}    The number of books that are currently borrowed.
 */
function booksBorrowedCount(books) {
  let numBorrowed = 0;
  // everytime a book is not returned, increase the count
  books.forEach((book) => {
    if(!book.borrows[0].returned) numBorrowed++;
  });
  return numBorrowed;
}

/**
 * Finds the top 5 most popular genres.
 * 
 * @param   {Object[]}  books An array of books.
 * @returns {Object[]}  An array of the most common genres.
 */
function getMostCommonGenres(books) {
  const genres = [];

  books.forEach((book) => {
    const genreName = book.genre;
    
    // if the genre has already been added as an object
    let found = false;
    genres.forEach((genre) => {
      if(genre.name === genreName) {
        genre.count++;
        found = true;
        return;
      }
    });

    // create the genre, if it doesn't already exist
    if(!found) {
      genres.push(createObject(genreName, 1));
    }
  });

  // sorts genre by count in descending order
  genres.sort((genreA, genreB) => (genreA.count > genreB.count ? -1 : 1));

  // delete extra genres (max 5)
  deleteExtraObjects(genres, 5);

  return genres;
}

/**
 * Finds the top 5 most popular books.
 * 
 * @param   {Object[]}  books An array of books.
 * @returns {Object[]}  An array of the most commonly borrowed books.
 */
function getMostPopularBooks(books) {
  // note: popularity is measured by times a book has been borrowed
  const popularBooks = [];

  books.forEach((book) => {
    popularBooks.push(createObject(book.title, book.borrows.length));
  });

  popularBooks.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  deleteExtraObjects(popularBooks, 5);

  return popularBooks;
}

/**
 * Finds the top 5 most popular authors.
 * 
 * @param   {Object[]}  books   An array of books.
 * @param   {Object[]}  authors An array of authors.
 * @returns {Object[]}  An array of the most commonly borrowed authors.
 */
function getMostPopularAuthors(books, authors) {
  // note: popularity is measured by times an author's book has been borrowed
  const popularAuthors = [];

  books.forEach((book) => {
    let authorName = findAuthorById(authors, book.authorId).name;
    const numBorrows = book.borrows.length;

    // if the author has already been added as an object
    let found = false;
    popularAuthors.forEach((author) => {
      if(author.name === authorName) {
        author.count += numBorrows;
        found = true;
        return;
      }
    });

    if(!found) {
      popularAuthors.push(
        createObject(authorName.first + " " + authorName.last, numBorrows));
    }
  });

  popularAuthors.sort((authorA, authorB) => 
    (authorA.count > authorB.count ? -1 : 1));
  deleteExtraObjects(popularAuthors, 5);

  return popularAuthors;
}

/**
 * This is a helper function. It deletes objects until a maximum from an array.
 * 
 * @param   {Object[]}  arr An array.
 * @param   {number}    num The max number of items in the array.
 */
function deleteExtraObjects(arr, num) {
  while(arr.length > num) {
    arr.pop();
  }
}

/** 
 * This is a helper function. It creates an object given the parameters.
 * 
 * @param   {string}  name  The name of the object.
 * @param   {number}  count A number representing a quantity of something.
 * @returns {Object}  An object with the given attributes.
 */
function createObject(name, count) {
  return {
    name: name,
    count: count
  }
};

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
  deleteExtraObjects
};