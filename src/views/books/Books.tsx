import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../../components/Book";
import { Navigation } from "../../helpers/navigation";
import './Books.scss';
import { Button, Select } from "react-md";
import { getBooks, removeBook, saveBook } from "../../helpers/bookservice";
import { IBook } from '../../common/models/IBooksResponse';
import { IBooksRequest } from "../../common/models/IBooksRequest";
import { AppContext } from "../../AppProvider";

interface IBooksListState {
  page: number;
  sortBy: string;
  sorting: string;
}

export const Books = () => {
  const [books, setBooks] = useState<IBook[] | undefined>(undefined);
  const [numberOfBooks, setNumberOfBooks] = useState<number | undefined>(undefined);
  const [bookListState, setBookListState] = useState<IBooksListState>({
    page: 1,
    sortBy: 'title',
    sorting: 'asc'
  });
  const appContext = useContext(AppContext);
  const {startLoading, stopLoading} = appContext;

  const fetchBooks = useCallback(async () => {
    startLoading();
    const response = await getBooks({...bookListState, pageSize: 5} as IBooksRequest);
    setBooks(response.books);
    setNumberOfBooks(response.numberOfBooks);
    stopLoading();
  }, [bookListState]);
  
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const onRemoveBook = async (bookId: string) => { 
    startLoading();
    await removeBook(bookId);
    await fetchBooks();
    stopLoading();
  }

  const onSave = async (book: IBook) => {
    startLoading();
    saveBook({ ...book });
    stopLoading();
  };

  const updateListState = (key: keyof IBooksListState, value: any) => {
    setBookListState({...bookListState, [key]: value, page: 1})
  }

  const sortByOptions = ([
    {
      label: 'Title',
      value: 'title'
    },
    {
      label: 'Page count',
      value: 'pageCount'
    }
  ]);

  const sortingOptions = ([
    {
      label: 'Ascending',
      value: 'asc'
    },
    {
      label: 'Descending',
      value: 'desc'
    }
  ]);

  return (
    <div className={"books"}>
      <div className='books__header'>
        <h1>Books</h1>
        <h3>Number of books: {numberOfBooks}</h3>
      </div>
      <div className={'books__actions'}>
        <Button onClick={() => setBookListState(state => {
          return {...state, page: state.page-1}
        })}>{"< prev"}</Button>
        <Button onClick={() => setBookListState(state => {
          return {...state, page: state.page+1}
        })}>{"next >"}</Button>
        <Select id={'sortBySelect'} 
          label={'Sort by'}
          className={'books__actions__sorting'}
          onChange={(value) => updateListState('sortBy', value)} 
          value={bookListState.sortBy} 
          options={sortByOptions} />
        <Select id={'sortingSelect'} 
          label={'Sort'}
          className={'books__actions__sorting'}
          onChange={(value) => updateListState('sorting', value)} 
          value={bookListState.sorting} 
          options={sortingOptions} />
        <Button themeType={"outline"} className={'books__new-book-button'}>
          <Link to={Navigation.newbook}>New book</Link>
        </Button>
      </div>
      <ul className={'books__list'}>
        {books &&
          books.map((book: IBook) => (
            <Book key={book.id} 
              book={book}
              onSaveBook={book => onSave(book)}
              onDeleteBook={bookId => onRemoveBook(bookId)} />
          ))}
      </ul>
    </div>
  );
};
