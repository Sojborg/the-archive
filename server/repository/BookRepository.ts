import { Model } from "mongoose";
import { IBooksRequest } from "../../src/common/models/IBooksRequest";
import { Book, IBook } from "../models/Book";
import { BaseRepository } from "./BaseRepositoty";

class BookRepository {

    async queryCollection(booksRequest: IBooksRequest, userId: string) {
        const { page, pageSize, sortBy, sorting } = booksRequest;

        const books = await Book.find({userId});

        return books;
    }

    public async getCountUserBooks(userId: string): Promise<number> {
        try {
            const books = await Book.find({ userId});

            return books.length;
        } catch (error) {
            throw new Error(`Could not do count books query: ${error}`);
        }
    }

    public async getAllBooks(): Promise<IBook[]> {
        try {
            const books = await Book.find();
            return books;
        } catch (error) {
            throw new Error(`Could not fetch books: ${error}`);
        }
    }

    public async getBookById(id: string): Promise<IBook | null> {
        try {
            const book = await Book.findById(id);
            return book;
        } catch (error) {
            throw new Error(`Could not fetch book: ${error}`);
        }
    }

    public async createBook(bookData: IBook): Promise<IBook> {
        try {
            const book = new Book(bookData);
            await book.save();
            return book;
        } catch (error) {
            throw new Error(`Could not create book: ${error}`);
        }
    }

    public async updateBook(bookData: IBook): Promise<IBook | null> {
        try {
            const book = await Book.findByIdAndUpdate(bookData.id, bookData, { new: true });
            return book;
        } catch (error) {
            throw new Error(`Could not update book: ${error}`);
        }
    }

    public async deleteBook(id: string): Promise<void> {
        try {
            await Book.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Could not delete book: ${error}`);
        }
    }
}

export const bookRepository = new BookRepository();