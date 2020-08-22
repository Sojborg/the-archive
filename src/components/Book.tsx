import React from "react";
import {IBook} from '../helpers/types';

interface IBookProps {
  book: IBook;
}

export const Book = (props: IBookProps) => {
  const {book} = props;

  return (
    <li key={book.id} className={"books__list__item"}>
      <img src={book.coverImageUrl} />
      <div className={"books__list__item__description"}>
        <h4>{book.title}</h4>
        <p>{book.synopsis}</p>
      </div>
      <div className={"books__list__item__info"}>
        <p>Publisher: {book.publisher}</p>
        <p>Page count: {book.pageCount}</p>
        <p>Product id: {book.productId}</p>
      </div>
    </li>
  );
};
