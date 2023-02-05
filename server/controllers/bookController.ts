import { repository } from "../repository/repository";
import { googleBooksService } from "../services/google-books-service";
import { IBooksResponse } from '../../src/common/models/IBooksResponse';
import { IBooksRequest } from "../../src/common/models/IBooksRequest";
import { bookRepository } from "../repository/BookRepository";

export const books = async (req: any, res: any) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const request = {
      ...req.body,
      pageSize: req.body.pageSize < 1 ? 1 : req.body.pageSize
    } as IBooksRequest;

    const books = await bookRepository.queryCollection(request, req.user.id);
    const numberOfBooks = await bookRepository.countCollection();

    const response = {
      books,
      numberOfBooks: 10
    } as IBooksResponse;

    res.send(JSON.stringify(response));
  } catch (e) {
    console.error(e);
  }
};

export const numberofbooks = async (req: any, res: any) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const count = await bookRepository.countCollection();
    const payload = {numberOfBooks: count};
    res.send(JSON.stringify(payload));
  } catch (e) {
    console.error(e);
  }
};

export const addbooktolist = async (req: any, res: any) => {
  try {
    console.log(req.body);
    const book = {
      ...req.body,
      userId: req.user.id
    }
    await bookRepository.createDocument(book);
    const numberOfBooksCount = await bookRepository.countCollection();
    const payload = {numberOfBooks: numberOfBooksCount};
    res.send(JSON.stringify(payload));
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
    bookRepository.replaceDocument(book);
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
    bookRepository.deleteDocument(data.id);
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