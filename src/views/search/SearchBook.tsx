import React, { useRef } from "react";
import "./SearchBook.scss";
import { Button } from "@material-ui/core";
import { SearchViewMode } from "./Search";
import { IBook } from "../../common/models/IBooksResponse";

interface IBookProps {
  book: IBook;
  viewMode: SearchViewMode;

  onSaveBook?(book: IBook): void;
  onDeleteBook?(bookId: string): void;
  onAddBook?(book: IBook): void;
}

export const SearchBook = (props: IBookProps) => {
  const { book, viewMode, onAddBook } = props;
  const addButtonRef = useRef<HTMLButtonElement | null>(null);

  const onAddToListClick = async () => {
    onAddBook && onAddBook(book);
  };

  return (
    <div
      key={book.id}
      className={`search-book search-book-${SearchViewMode[viewMode]}`}
    >
      <div
        className={`search-book__content search-book__content-${SearchViewMode[viewMode]}`}
      >
        <div
          className={`search-book__actions search-book__actions-${SearchViewMode[viewMode]}`}
        >
          <Button
            ref={addButtonRef}
            variant={"outlined"}
            className={"search-book__actions__add"}
            onClick={onAddToListClick}
          >
            Add to list
          </Button>
        </div>
        <img src={book.coverImageUrl} alt={book.coverImageUrl} />
        <div
          className={`search-book__description search-book__description-${SearchViewMode[viewMode]}`}
        >
          <h4>{book.title}</h4>
          <p className={`search-book__description search-book__synopsis-${SearchViewMode[viewMode]}`}>{book.synopsis}</p>
        </div>
        <div
          className={`search-book__info search-book__info-${SearchViewMode[viewMode]}`}
        >
          <p>Publisher: {book.publisher}</p>
          <p>Page count: {book.pageCount}</p>
          <p>Product id: {book.productId}</p>
        </div>
      </div>
    </div>
  );
};
