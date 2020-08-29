import React, { useEffect, useState } from "react";
import { removeBook, saveBook } from "../helpers/bookservice";
import { IBook } from "../helpers/types";
import "./Book.scss";
import { TextEditor } from "./TextEditor";

interface IBookProps {
  book: IBook;
}

interface IDisplayState {
  notes: boolean;
}

export const Book = (props: IBookProps) => {
  const [notes, setNotes] = useState<string | undefined>(undefined);
  const { book } = props;
  const [displayState, setDisplayState] = useState({
    notes: false,
  } as IDisplayState);

  useEffect(() => {
    if (book.notes) {
      setNotes(book.notes);
    }
  }, [book.notes]);

  const onAddToListClick = () => {
    saveBook(book);
  };

  const onRemoveClick = () => {
    removeBook(book.id);
  };

  const save = async () => {
    await saveBook({ ...book, title: "Harry Potter - test", notes: notes });
  };

  const toggleNotes = (toggleName: keyof IDisplayState) => {
    setDisplayState({
      ...displayState,
      [toggleName]: !displayState[toggleName],
    });
  };

  return (
    <li key={book.id} className={"book"}>
      <div className={"book__content"}>
        <div className={"book__actions"}>
          <button className={"book__actions__add"} onClick={onAddToListClick}>
            Add to list
          </button>
          <button className={"book__actions__remove"} onClick={onRemoveClick}>
            Remove
          </button>
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
        </div>
      </div>
      <div className={"book__notes"}>
        <h4 onClick={() => toggleNotes("notes")}>Notes</h4>
        {displayState.notes && (
          <div>
            <TextEditor
              value={notes || ""}
              onChange={(newContent) => {
                console.log(newContent)
                 setNotes(newContent)}
              }
            />
            <button onClick={save}>Save notes</button>
          </div>
        )}
      </div>
    </li>
  );
};
