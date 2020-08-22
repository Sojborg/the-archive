import { config } from "../config";
import fetch from 'node-fetch';
import { response } from "express";

class GoogleBooksService {
  private api = 'https://www.googleapis.com/books/v1/volumes';

  query = (queryString: string) => {
    const formattedQuery = queryString.trim().replace(' ', '+');
    const books = fetch(`${this.api}?q=${formattedQuery}&key=${config.googleBooksKey}`)
      .then(response => response.json())
      .then(books => {
        console.log('books', books);
        return books;
      } )
      .catch(e => console.log('Error when fetching google books', e));
    
    return books;
  }
}

export const googleBooksService = new GoogleBooksService();