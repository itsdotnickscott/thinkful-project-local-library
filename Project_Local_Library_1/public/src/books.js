/**
 * The book stats page of the library databse.
 *
 * @author Nick Scott.
 * @since  1.25.2021
 */

const {findAccountById} = require('./accounts');

/**
 * Finds an author based off of a given id.
 * 
 * @param   {Object[]}  authors An array of authors.
 * @param   {number}    id      An author identification number.
 * @returns {Object}    The author that matches the given id.
 */
 function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

/**
 * Finds a book based off of a given id.
 * 
 * @param   {Object[]}  books An array of books.
 * @param   {number}    id    A book identification number.
 * @returns {Object}    The book that matches the given id.
 */
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

/**
 * Splits books based off of their return status.
 * 
 * @param   {Object[]}    books An array of books.
 * @returns {Object[][]}  An array with two arrays: borrowed and returned books.
 */
function partitionBooksByBorrowedStatus(books) {
  const available = books.filter((book) => book.borrows[0].returned);
  const borrowed = books.filter((book) => !book.borrows[0].returned);
  return [borrowed, available];
}

/**
 * Finds the information of all borrowers of a particular book.
 * 
 * @param   {Object}    book      A book object.
 * @param   {Object[]}  accounts  An array of accounts.
 * @returns {Object[]}  An array of every transaction of a specific book.
 */
function getBorrowersForBook(book, accounts) {
  const allBorrowers = book.borrows.map((lend) => {
    const account = findAccountById(accounts, lend.id);
    return {
      id: lend.id, 
      returned: lend.returned, 
      ...account
    };
  });

  while(allBorrowers.length > 10) {
    allBorrowers.pop();
  }

  return allBorrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
