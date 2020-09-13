import { getRequest, postRequest } from "./apiService";
import { IBook } from "./types";

export const getBooks = async () => {
  return await getRequest<Promise<IBook[]>>('/books');
};

export const saveBook = async (book: IBook) => {
  postRequest('/savebook', book);
};

export const addBookList = async (book: IBook) => {
  postRequest('/addbooktolist', book);
};

export const removeBook = async (id: string) => {
  await postRequest('/removebook', {id: id});
}
