import { DocumentClient } from "documentdb";
import { config } from "../config";
import { IBooksRequest } from "../../src/common/models/IBooksRequest";
import { IUser } from "../controllers/loginController";

var url = require("url");

class Repository {
  client = new DocumentClient(config.endpoint, {
    masterKey: config.primaryKey,
  });

  HttpStatusCodes = { NOTFOUND: 404 };
  databaseUrl = `dbs/${config.database.id}`;
  collectionUrl = `${this.databaseUrl}/colls/${config.collection.id}`;

  /**
   * Get the database by ID, or create if it doesn't exist.
   * @param {string} database - The database to get or create
   */
  getDatabase() {
    console.log(`Getting database:\n${config.database.id}\n`);

    return new Promise((resolve, reject) => {
      this.client.readDatabase(this.databaseUrl, (err, result) => {
        if (err) {
          if (err.code == this.HttpStatusCodes.NOTFOUND) {
            this.client.createDatabase(config.database, (err, created) => {
              if (err) reject(err);
              else resolve(created);
            });
          } else {
            reject(err);
          }
        } else {
          resolve(result);
        }
      });
    });
  }

  createTable(tableName: string) {
    if (!tableName) {
      new Error("Table name not supplied");
    }

    return new Promise((resolve, reject) => {
      this.client.createCollection(
        this.databaseUrl,
        {
          id: tableName,
        },
        { offerThroughput: 400 },
        (err, created) => {
          if (err) reject(err);
          else resolve(created);
        }
      );
    });
  }

  /**
   * Get the collection by ID, or create if it doesn't exist.
   */
  getCollection() {
    console.log(`Getting collection:\n${config.collection.id}\n`);

    return new Promise((resolve, reject) => {
      this.client.readCollection(this.collectionUrl, (err, result) => {
        if (err) {
          if (err.code == this.HttpStatusCodes.NOTFOUND) {
            this.client.createCollection(
              this.databaseUrl,
              config.collection,
              { offerThroughput: 400 },
              (err, created) => {
                if (err) reject(err);
                else resolve(created);
              }
            );
          } else {
            reject(err);
          }
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Get the document by ID, or create if it doesn't exist.
   * @param {function} callback - The callback function on completion
   */
  getDocument(document: any) {
    let documentUrl = `${this.collectionUrl}/docs/${document.id}`;
    console.log(`Getting document:\n${document.id}\n`);

    return new Promise((resolve, reject) => {
      this.client.readDocument(documentUrl, (err, result) => {
        if (err) {
          if (err.code == this.HttpStatusCodes.NOTFOUND) {
            console.log("DOCUMENT", document);
            this.client.createDocument(
              this.collectionUrl,
              document,
              (err, created) => {
                console.log("DONE", err, created);
                if (err) reject(err);
                else resolve(created);
              }
            );
          } else {
            reject(err);
          }
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Query the collection using SQL
   */
  queryCollection(booksRequest: IBooksRequest) {
    console.log(`Querying collection through index:\n${config.collection.id}`);
    const { page, pageSize, sortBy, sorting } = booksRequest;

    return new Promise((resolve, reject) => {
      this.client
        .queryDocuments(
          this.collectionUrl,
          `SELECT * FROM b
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

  countCollection() {
    console.log(`Querying collection through index:\n${config.collection.id}`);

    return new Promise((resolve, reject) => {
      this.client
        .queryDocuments(this.collectionUrl, "SELECT VALUE COUNT(1) FROM books")
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

  /**
   * Replace the document by ID.
   */
  replaceDocument(tableName: string, document: any) {
    let documentUrl = `${this.databaseUrl}/colls/${tableName}/docs/${document.id}`;
    console.log(`Replacing document:\n${document.id}\n`);

    return new Promise((resolve, reject) => {
      this.client.replaceDocument(documentUrl, document, (err, result) => {
        if (err) reject(err);
        else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Delete the document by ID.
   */
  deleteFamilyDocument(id: any) {
    let documentUrl = `${this.collectionUrl}/docs/${id}`;
    console.log(`Deleting document:\n${id}\n`);

    return new Promise((resolve, reject) => {
      this.client.deleteDocument(documentUrl, (err, result) => {
        if (err) reject(err);
        else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Cleanup the database and collection on completion
   */
  cleanup() {
    console.log(`Cleaning up by deleting database ${config.database.id}`);

    return new Promise((resolve, reject) => {
      this.client.deleteDatabase(this.databaseUrl, (err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });
  }

  getUserByUsername(username: string): Promise<IUser | null> {
    try {
      return new Promise((resolve, reject) => {
        this.client
          .queryDocuments<IUser>(
            `${this.databaseUrl}/colls/Users`,
            `SELECT * FROM Users WHERE Users.username = "${username}"`
          )
          .toArray((err, results) => {
            if (err) reject(err);
            else {
              resolve(results.length > 0 ? results[0] : null);
            }
          });
      });
    } catch (e) {
      console.error('getUserByUsername', e);
      throw e;
    }
  }

  /**
   * Exit the app with a prompt
   * @param {message} message - The message to display
   */
  exit(message: any) {
    console.log(message);
    console.log("Press any key to exit");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", process.exit.bind(process, 0));
  }
}

export const repository = new Repository();

// getDatabase()
//     .then(() => getCollection())
//     .then(() => getFamilyDocument(config.documents["Elon Musk"]))
//     .then(() => getFamilyDocument(config.documents["Seven Habits of Highly Effective People"]))
//     .then(() => queryCollection())
//     // .then(() => deleteFamilyDocument(config.documents.Andersen))
//     // .then(() => cleanup())
//     .then(() => { exit(`Completed successfully`); })
//     .catch((error) => { exit(`Completed with error ${JSON.stringify(error)}`) });
