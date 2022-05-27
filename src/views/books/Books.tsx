import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Book} from "./Book";
import {Navigation} from "../../helpers/navigation";
import "./Books.scss";
import {Button, MenuItem, Select} from "@material-ui/core";
import {removeBook, saveBook} from "../../helpers/bookservice";
import {IBook} from "../../common/models/IBooksResponse";
import {AppContext} from "../../AppProvider";
import {useBooks} from '../../hooks/useBooks';

interface IBooksListState {
  page: number;
  sortBy: string;
  sorting: string;
  pageSize: 5;
}

export const Books = () => {
  const [bookListState, setBookListState] = useState<IBooksListState>({
    page: 1,
    sortBy: "title",
    sorting: "asc",
    pageSize: 5
  });
  const appContext = useContext(AppContext);
  const { startLoading, stopLoading } = appContext;
  const {data} = useBooks(bookListState);

  const onRemoveBook = async (bookId: string) => {
    startLoading();
    await removeBook(bookId);
    // await fetchBooks();
    stopLoading();
  };

  const onSave = async (book: IBook) => {
    startLoading();
    await saveBook({ ...book });
    stopLoading();
  };

  const updateListState = (key: keyof IBooksListState, value: any) => {
    setBookListState({ ...bookListState, [key]: value, page: 1 });
  };

  const sortByOptions = [
    {
      label: "Title",
      value: "title",
    },
    {
      label: "Page count",
      value: "pageCount",
    },
  ];

  const sortingOptions = [
    {
      label: "Ascending",
      value: "asc",
    },
    {
      label: "Descending",
      value: "desc",
    },
  ];

  return (
    <div className={"books"}>
      <div className="books__header">
        <h1>Books</h1>
        <h3>Number of books: {data?.numberOfBooks}</h3>
      </div>
      <div className={"books__actions"}>
        <Button
          onClick={() =>
            setBookListState((state) => {
              return { ...state, page: state.page - 1 };
            })
          }
        >
          {"< prev"}
        </Button>
        <Button
          onClick={() =>
            setBookListState((state) => {
              return { ...state, page: state.page + 1 };
            })
          }
        >
          {"next >"}
        </Button>
        <Select
          id={"sortBySelect"}
          label={"Sort by"}
          className={"books__actions__sorting"}
          onChange={(e) => updateListState("sortBy", e.target.value)}
          value={bookListState.sortBy}
        >
          {sortByOptions.map((x) => (
            <MenuItem key={x.value} value={x.value}>{x.label}</MenuItem>
          ))}
        </Select>
        <Select
          id={"sortingSelect"}
          label={"Sort"}
          className={"books__actions__sorting"}
          onChange={(e) => updateListState("sorting", e.target.value)}
          value={bookListState.sorting}
        >
          {sortingOptions.map((x) => (
            <MenuItem key={x.value} value={x.value}>{x.label}</MenuItem>
          ))}
        </Select>
        <Button variant={'outlined'} className={"books__new-book-button"}>
          <Link to={Navigation.newbook}>New book</Link>
        </Button>
      </div>
      <ul className={"books__list"}>
        {data &&
          data.books.map((book: IBook) => (
            <Book
              key={book.id}
              book={book}
              onSaveBook={(book) => onSave(book)}
              onDeleteBook={(bookId) => onRemoveBook(bookId)}
            />
          ))}
      </ul>
    </div>
  );
};
