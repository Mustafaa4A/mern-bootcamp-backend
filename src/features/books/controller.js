import BookModel, { validateBook } from "./model.js";
import { createItem, getList, fetchSingle, updateItem, deleteItem, fetchData } from "../../utils/query.js";

const DUPLICATE_MSG = "This book (title & author) already exists";
const ITEM_NAME = "Book";

// Create Book
export const createBook = createItem(BookModel, validateBook, DUPLICATE_MSG);

// Get All Books
export const getBooks = fetchData(BookModel);

// Get Book by ID
export const getBookById = fetchSingle(BookModel, ITEM_NAME);

// Update Book
export const updateBook = updateItem(BookModel, validateBook, DUPLICATE_MSG, ITEM_NAME);

// Delete Book
export const deleteBook = deleteItem(BookModel, ITEM_NAME);
