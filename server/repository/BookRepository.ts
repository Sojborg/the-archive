import { IBooksRequest } from "../../src/common/models/IBooksRequest";
import { BaseRepository } from "./BaseRepositoty";

class BookRepository extends BaseRepository<any> {


    queryCollection(booksRequest: IBooksRequest, userId: string) {
        const { page, pageSize, sortBy, sorting } = booksRequest;

        return new Promise((resolve, reject) => {
            this.client
            .queryDocuments(
                this.collectionUrl,
                `SELECT * FROM b
                WHERE b.userId = "${userId}"
                ORDER BY b.${sortBy} ${sorting}
                OFFSET ${(page - 1) * pageSize} LIMIT ${pageSize}`
            )
            .toArray((err, results) => {
                if (err) reject(err);
                else {
                for (var queryResult of results) {
                    let resultString = JSON.stringify(queryResult);
                    console.log(`\tQuery returned ${resultString}`);
                }
                console.log();
                resolve(results);
                }
            });
        });
    }
}

export const bookRepository = new BookRepository('Books');