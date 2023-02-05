import { IBooksRequest } from "../../src/common/models/IBooksRequest";
import { Book } from "../models/Book";
import { BaseRepository } from "./BaseRepositoty";

class BookRepository extends BaseRepository<any> {

    async queryCollection(booksRequest: IBooksRequest, userId: string) {
        const { page, pageSize, sortBy, sorting } = booksRequest;

        const books = await Book.find({userId});

        return books;
    }
}

export const bookRepository = new BookRepository('Books');