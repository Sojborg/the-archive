import React, { useEffect, useState } from "react";
import { SearchBook } from "./SearchBook";
import { useFetch } from "../../hooks/useFetch";
import "./Search.scss";
import { addBookList, getNumberOfBooks } from "../../helpers/bookservice";
import { motion } from "framer-motion"
import { IBook } from "../../common/models/IBooksResponse";

interface ISearchBarProps {
  query?: string;
}

export enum SearchViewMode {
  small,
  large,
}

export const Search = (props: ISearchBarProps) => {
  const [viewMode, setViewMode] = useState(SearchViewMode.small);
  const [addingItem, setAddingItem] = useState<string | undefined>(undefined);
  const [numberOfBooks, setNumberOfBooks] = useState<number | undefined>(
    undefined
  );
  const response = useFetch<any>(`/books/searchbook?q=${props.query}`);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNumberOfBooks();
      setNumberOfBooks(response.numberOfBooks);
    };
    fetchData();
  }, []);

  const toggleViewMode = (viewMode: SearchViewMode) => {
    setViewMode(viewMode);
  };

  const handleOnAddBook = async (book: IBook) => {
    setAddingItem(book.id);
    await addBookList(book);
    const response = await getNumberOfBooks();
    setNumberOfBooks(response.numberOfBooks);
  };

  const viewClass = `search__list-${SearchViewMode[viewMode]}`;

  return (
    <div className={"search"}>
      <div className={"search__header"}>
        <h2>Search</h2>
        <div className={"search__view-mode"}>
          <span>view:</span>
          <span
            className={
              viewMode === SearchViewMode.small
                ? "search__view-mode-active"
                : ""
            }
            onClick={() => toggleViewMode(SearchViewMode.small)}
          >
            small
          </span>
          <span
            className={
              viewMode === SearchViewMode.large
                ? "search__view-mode-active"
                : ""
            }
            onClick={() => toggleViewMode(SearchViewMode.large)}
          >
            large
          </span>
        </div>
      </div>
      {!response.error && response.response && response.response.items && (
        <div className={viewClass}>
          {response.response.items.map((apiBook: any) => {
            const { volumeInfo } = apiBook;
            const book = {
              id: apiBook.id,
              title: volumeInfo.title,
              synopsis: volumeInfo.description,
              publisher: volumeInfo.publisher,
              pageCount: volumeInfo.pageCount,
              coverImageUrl:
                volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail,
            } as IBook;
            console.log("book", book);
            return (
              <>
                {addingItem === book.id && (                  
                    <motion.div className={'motion-test'}
                    animate={{ y: '100%' }}
                    transition={{ ease: "easeOut", duration: 2 }}
                />
                )}
                <SearchBook
                  key={book.id}
                  book={book}
                  onAddBook={handleOnAddBook}
                  viewMode={viewMode}
                />
              </>
            );
          })}
        </div>
      )}
      <div className={"search__books-summary"}>
        <div className={"search__books-summary__content"}>
          <div className={"search__books-summary__text"}>Archived books</div>
          <div className={"search__books-summary__number"}>
            {numberOfBooks ? numberOfBooks : "-"}
          </div>
        </div>
      </div>
    </div>
  );
};
