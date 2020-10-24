import { repository } from "../repository/repository";
import { googleBooksService } from "../services/google-books-service";
import { IBooksResponse } from '../../src/common/models/IBooksResponse';

export const books = async (req: any, res: any) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const books = await repository.queryCollection(req.body);
    const numberOfBooks = await repository.countCollection();

    const response = {
      books,
      numberOfBooks
    } as IBooksResponse;

    res.send(JSON.stringify(response));
  } catch (e) {
    console.error(e);
  }
};

export const numberofbooks = async (req: any, res: any) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const count = await repository.countCollection();
    const payload = {numberOfBooks: count};
    res.send(JSON.stringify(payload));
  } catch (e) {
    console.error(e);
  }
};

export const addbooktolist = async (req: any, res: any) => {
  try {
    console.log(req.body);
    await repository.getDocument(req.body);
    const numberOfBooksCount = await repository.countCollection();
    const payload = {numberOfBooks: numberOfBooksCount};
    res.send(JSON.stringify(payload));
  } catch (e) {
    console.error(e);
  }
};

export const savebook = async (req: any, res: any) => {
  try {
    console.log(req.body);
    repository.replaceFamilyDocument(req.body);
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
    repository.deleteFamilyDocument(data.id);
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