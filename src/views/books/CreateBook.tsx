import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextEditor } from '../../components/TextEditor';
import { Navigation } from '../../helpers/navigation';

interface IBook {
  id: string;
  coverImageUrl: string
  title: string;
  author: string;
  publisher: string;
  pageCount: number;
  synopsis: string;
  productId: string;
}

const bookInfo = {
  coverImageUrl:
    'https://images-na.ssl-images-amazon.com/images/I/51JM3rldZCL._SX329_BO1,204,203,200_.jpg',
  productId: '0525509283',
  pageCount: 320,
  publisher: 'One World',
};

export const CreateBook = () => {
  const history = useHistory();  
  const [book, setBook] = useState({
    id: '',
    title: '',
    author: '',
    coverImageUrl: '',
    publisher: '',
    pageCount: 0,
    synopsis: '',
    productId: ''
  } as IBook); 

  const onChange = (name: keyof IBook, value: any) => {
    let editedBook: IBook = { ...book, ...bookInfo, [name]: value };
    console.log(editedBook);
    setBook(editedBook);
  };

  const save = async () => {
    try {
      await fetch('/savebook', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(book),
      });

      history.push(Navigation.books);
    } catch(e) {

    }
  };

  return (
    <div>
      <h2>New book</h2>
      <div>
        <label htmlFor='id'>Id</label>
        <input
          id='id'
          type={'text'}
          value={book.id}
          onChange={(e) => onChange('id', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          id={'title'}
          type={'text'}
          value={book.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='author'>Author</label>
        <input
          id={'author'}
          type={'text'}
          value={book.author}
          onChange={(e) => onChange('author', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='publisher'>Publisher</label>
        <input
          id={'publisher'}
          type={'text'}
          value={book.publisher}
          onChange={(e) => onChange('publisher', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='pageCount'>Number of pages</label>
        <input
          id={'pageCount'}
          type={'text'}
          value={book.pageCount}
          onChange={(e) => onChange('pageCount', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='pageCount'>Synopsis</label>
        <TextEditor 
          value={book.synopsis}
          onChange={(newContent) => onChange('synopsis', newContent)} />
      </div>
      

      <button type={'button'} onClick={save}>
        Save
      </button>
    </div>
  );
};
