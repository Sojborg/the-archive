import { getRequest, postRequest } from "./apiService";
import { IBook } from "./types";

export const getBooks = async () => {
  return await getRequest<Promise<IBook[]>>('/books');
};

export const saveBook = async (book: IBook) => {
  postRequest('/savebook', book);
};

export const addBookList = async (book: IBook) => {
  return await postRequest('/addbooktolist', book);
};

export const removeBook = async (id: string) => {
  await postRequest('/removebook', {id: id});
}

export const getNumberOfBooks = async () => {

  return await getRequest<Promise<any>>(`/numberofbooks?no-cache=${getRandomInt(999999)}`);
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}