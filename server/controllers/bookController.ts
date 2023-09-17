import { googleBooksService } from "../services/google-books-service";
import { IBooksRequest } from "../../src/common/models/IBooksRequest";
import { Book } from "../models/Book";
import { userRepository } from "../repository/UserRepository";
import { bookService } from "../services/book-service";

export const books = async (req: any, res: any) => {
  try {
    const request = {
      ...req.body,
      pageSize: req.body.pageSize < 1 ? 1 : req.body.pageSize
    } as IBooksRequest;

    const response = await bookService.queryUserBooks(req.user.name, request);

    res.json(response);
  } catch (e) {
    console.error(e);
  }
};

export const numberofbooks = async (req: any, res: any) => {
  try {
    const count = await bookService.getUserNumberOfBooks(req.user.name);
    const payload = {numberOfBooks: count};
    res.json(payload);
  } catch (e) {
    console.error(e);
  }
};

export const addbooktolist = async (req: any, res: any) => {
  try {
    const user = await userRepository.getUserByUsername(req.user.name);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    bookService.addbooktolist(req.user.name, req.body);
  } catch (e) {
    console.error(e);
  }
};

export const savebook = async (req: any, res: any) => {
  try {
    console.log(req.body);
    const book = {
      ...req.body,
      userId: req.user.id
    }
    // bookRepository.replaceDocument(book);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
};

export const removebook = async (req: any, res: any) => {
  try {
    console.log('BODY', req.body);
    const data = req.body
    console.log(data);
    // bookRepository.deleteDocument(data.id);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
};

export const searchbook = async (req: any, res: any) => {
  console.log('request', req.query.q);
  const searchQuery = encodeURI(req.query.q as string) ;
  console.log('searchQuery', searchQuery);
  const books = await googleBooksService.query(searchQuery);
  res.send(JSON.stringify(books));
};