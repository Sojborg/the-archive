import { googleBooksService } from "../services/google-books-service";
import { IBooksRequest } from "../../src/common/models/IBooksRequest";
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

    bookService.addbooktolist(user, req.body);
  } catch (e) {
    console.error(e);
  }
};

export const savebook = async (req: any, res: any) => {
  try {
    console.log(req.body);
    const user = await userRepository.getUserByUsername(req.user.id);
    const book = {
      ...req.body,
      userId: user?.id
    }
    
    const savedBook = await bookService.savebook(book);
    res.json({savedBook});
  } catch (e) {
    console.error(e);
  }
};

export const removebook = async (req: any, res: any) => {
  try {    
    // Check if user has access to book
    const user = await userRepository.getUserByUsername(req.user.id);
    const book = await bookService.getBookById(req.data.id);
    if (!user || book?.userId !== user.id) {
      res.sendStatus(403);
      return;
    }

    await bookService.removebook(req.data.id);

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