import React from "react";
import { removeBook, saveBook } from "../helpers/bookservice";
import {IBook} from '../helpers/types';
import './Book.scss';

interface IBookProps {
  book: IBook;
}

export const Book = (props: IBookProps) => {
  const {book} = props;

  const onAddToListClick = () => {
    saveBook(book);
  }

  const onRemoveClick = () => {
    removeBook(book.id);
  }

  return (
    <li key={book.id} className={"book"}>
      <div className={'book__actions'}>
        <button className={'book__actions__add'}
          onClick={onAddToListClick}>
            Add to list
        </button>
        <button className={'book__actions__remove'}
          onClick={onRemoveClick}>
            Remove
        </button>
      </div>
      <img src={book.coverImageUrl} />
      <div className={"book__description"}>
        <h4>{book.title}</h4>
        <p>{book.synopsis}</p>
      </div>
      <div className={"book__info"}>
        <p>Publisher: {book.publisher}</p>
        <p>Page count: {book.pageCount}</p>
        <p>Product id: {book.productId}</p>
      </div>
    </li>
  );
};
