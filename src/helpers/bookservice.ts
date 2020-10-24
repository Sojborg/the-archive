import { IBook, IBooksResponse } from "../common/models/IBooksResponse";
import { getRequest, postRequest } from "./apiService";

export const getBooks = async (): Promise<IBooksResponse> => {
  return await getRequest<Promise<IBooksResponse>>('/books');
};

export const saveBook = async (book: IBook) => {
  postRequest('/books/savebook', book);
};

export const addBookList = async (book: IBook) => {
  return await postRequest('/books/addbooktolist', book);
};

export const removeBook = async (id: string) => {
  await postRequest('/books/removebook', {id: id});
}

export const getNumberOfBooks = async () => {

  return await getRequest<Promise<any>>(`/books/numberofbooks?no-cache=${getRandomInt(999999)}`);
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}