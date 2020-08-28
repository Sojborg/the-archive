import { postRequest } from "./apiService";
import { IBook } from "./types";

export const saveBook = async (book: IBook) => {
  postRequest('/savebook', book);
};

export const removeBook = async (id: string) => {
  postRequest('/removebook', {id: id});
}
