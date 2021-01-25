/**
 * The accounts stats page of the library databse.
 *
 * @author Nick Scott.
 * @since  1.25.2021
 */

 /**
  * Finds an account given a specific id number.
  * 
  * @param   {Object[]}  accounts  An array of accounts.
  * @param   {number}    id        An identification number.
  * @returns {Object}    The account matching the given id.
  */
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

/**
 * Sorts an array of accounts by last name alphabetically.
 * 
 * @param   {Object[]}  accounts An array of accounts.
 * @returns {Object[]}  An array of accounts alphabetically sorted by last name.
 */
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => 
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase()
  ? 1 : -1);
}

/**
 * Finds the number of books an account has borrowed.
 * 
 * @param   {Object}    account An account obejct.
 * @param   {Object[]}  books   An array of books.
 * @returns {number}    The number of books this account has borrowed.
 */
function numberOfBorrows(account, books) {
  let accumulator = 0;
  return books.reduce((acc, book) => {
    let borrowed = 0;
    acc += book.borrows.reduce((borrows, borrow) => 
    borrows += borrow.id === account.id ? 1 : 0, borrowed);
    return acc;
  }, accumulator);
}

/**
 * Finds the books that are currently being borrowed by an account.
 * 
 * @param   {Object}    account An account object.
 * @param   {Object[]}  books   An array of books.
 * @param   {Object[]}  authors An array of authors.
 * @returns {Object[]}  An array of books currently checked out.
 */
function getBooksPossessedByAccount(account, books, authors) {
  const borrows = books.filter((book) => book.borrows[0].id === account.id);
  return borrows.map((borrow) => {
    const author = authors.find((author) => author.id === borrow.authorId);
    return {
      id: borrow.id,
      title: borrow.title,
      genre: borrow.genre,
      authorId: borrow.authorId,
      author: author,
      borrows: borrow.borrows
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
