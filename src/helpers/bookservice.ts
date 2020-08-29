import { postRequest } from "./apiService";
import { IBook } from "./types";

export const saveBook = async (book: IBook) => {
  postRequest('/savebook', book);
};

export const addBookList = async (book: IBook) => {
  postRequest('/addbooktolist', book);
};

export const removeBook = async (id: string) => {
  postRequest('/removebook', {id: id});
}
