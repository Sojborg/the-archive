import { IBooksRequest } from '../../src/common/models/IBooksRequest';
import { IBooksResponse } from '../../src/common/models/IBooksResponse';
import {Book, IBook} from '../models/Book';
import { IUser } from '../models/User';
import { bookRepository } from '../repository/BookRepository';
import { userRepository } from '../repository/UserRepository';

class BookService {
    async queryUserBooks(username: string, queryOptions: IBooksRequest) {
        const user = await userRepository.getUserByUsername(username);
        const books = await bookRepository.queryCollection(queryOptions, user!.id);
        const numberOfBooks = await bookRepository.getCountUserBooks(user!.id);

        const response = {
            books,
            numberOfBooks: numberOfBooks
        } as IBooksResponse;

        return response;
    }

    async getUserNumberOfBooks(username: string) {
        const user = await userRepository.getUserByUsername(username);        
        const numberOfBooks = await bookRepository.getCountUserBooks(user!.id);
        return numberOfBooks;
    }

    async addbooktolist (user: IUser, book: IBook): Promise<number | null> {

        const bookModel = new Book({
            ...book,
            userId: user.id
        });
    
        await bookRepository.createBook(bookModel);
        const numberOfBooks = await this.getUserNumberOfBooks(user.username);

        return numberOfBooks;
    };

    async savebook (book: IBook): Promise<IBook | null> {
        const bookModel = new Book(book);
        const savedBook = await bookRepository.updateBook(bookModel);
        return savedBook;
    };

    async removebook (bookId: string): Promise<void> {
        await bookRepository.deleteBook(bookId);
    };
}

export const bookService = new BookService();
