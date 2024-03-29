import React, { useEffect, useState } from "react";
import "./Book.scss";
import { TextEditor } from "../../components/TextEditor";
import { Button, MenuItem, Select } from "@material-ui/core";
import { IBook, BookStatus } from "../../common/models/IBooksResponse";

interface IBookProps {
  book: IBook;
  onSaveBook?(book: IBook): void;
  onDeleteBook?(bookId: string): void;
}

interface IDisplayState {
  notes: boolean;
}

export const Book = (props: IBookProps) => {
  const [book, setBook] = useState<IBook>(props.book);
  const [displayState, setDisplayState] = useState({
    notes: false,
  } as IDisplayState);
  const { onSaveBook } = props;

  useEffect(() => {
    if (book) {
      setBook(book);
    }
  }, [book]);

  const toggleNotes = (toggleName: keyof IDisplayState) => {
    setDisplayState({
      ...displayState,
      [toggleName]: !displayState[toggleName],
    });
  };

  const update = (propertyName: keyof IBook, value: any) => {
    setBook({
      ...book,
      [propertyName]: value,
    });
  };

  const options = [
    {
      label: "To read",
      value: BookStatus.ToRead,
    },
    {
      label: "Reading",
      value: BookStatus.Reading,
    },
    {
      label: "Done",
      value: BookStatus.Done,
    },
  ];

  return (
    <li key={book.id} className={"book"}>
      <div className={"book__content"}>
        <div className={"book__actions"}>
          <Button
            variant={'outlined'}
            className={"book__actions__remove"}
            onClick={() => props.onDeleteBook && props.onDeleteBook(book.id)}
          >
            Remove
          </Button>
        </div>
        <img src={book.coverImageUrl} alt={book.coverImageUrl} />
        <div className={"book__description"}>
          <h4>{book.title}</h4>
          <p>{book.synopsis}</p>
        </div>
        <div className={"book__info"}>
          <p>Publisher: {book.publisher}</p>
          <p>Page count: {book.pageCount}</p>
          <p>Product id: {book.productId}</p>
          Status:{" "}
          <Select
            id={"test"}
            onChange={(e) => update("status", e.target.value)}
            value={book.status ? book.status.toString() : ""}            
          >
            {options.map(x => <MenuItem key={x.value} value={x.value}>{x.label}</MenuItem>)}            
          </Select>
        </div>
      </div>
      <div className={"book__notes"}>
        <h4 onClick={() => toggleNotes("notes")}>Notes</h4>
        {displayState.notes && (
          <div>
            <TextEditor
              value={book.notes || ""}
              onChange={(newContent) => {
                console.log(newContent);
                update("notes", newContent);
              }}
            />
          </div>
        )}
      </div>
      <Button
        variant={'outlined'}
        onClick={() => onSaveBook && onSaveBook(book)}
      >
        Save changes
      </Button>
    </li>
  );
};
