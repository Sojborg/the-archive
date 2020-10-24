import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../../components/Book";
import { Navigation } from "../../helpers/navigation";
import './Books.scss';
import { Button, LinearProgress } from "react-md";
import { getBooks, removeBook, saveBook } from "../../helpers/bookservice";
import { IBook } from '../../common/models/IBooksResponse';
import { IBooksRequest } from "../../common/models/IBooksRequest";

export const Books = () => {
  const [books, setBooks] = useState<IBook[] | undefined>(undefined);
  const [numberOfBooks, setNumberOfBooks] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    const response = await getBooks({page, pageSize: 5} as IBooksRequest);
    setBooks(response.books);
    setNumberOfBooks(response.numberOfBooks);
    setIsLoading(false);
  }
  
  useEffect(() => {
    fetchBooks();
  }, [page]);

  const onRemoveBook = async (bookId: string) => { 
    setIsLoading(true);
    await removeBook(bookId);
    await fetchBooks();
    setIsLoading(false);
  }

  const onSave = async (book: IBook) => {
    setIsLoading(true);
    saveBook({ ...book });
    setIsLoading(false);
  };

  return (
    <div className={"books"}>
      {isLoading && <div className={'loading-linear'}><LinearProgress id="simple-linear-progress" /></div>}
      <div className='books__header'>
        <h1>Books</h1>
        <h3>Number of books: {numberOfBooks}</h3>
      </div>
      <div className={'books__actions'}>
        <Button themeType={"outline"} className={'books__new-book-button'}>
          <Link to={Navigation.newbook}>New book</Link>
        </Button>
        <Button onClick={() => setPage(page-1)}>{"<"}</Button>
        <Button onClick={() => setPage(page+1)}>{">"}</Button>
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
