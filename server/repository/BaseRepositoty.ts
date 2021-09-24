import { DocumentClient } from "documentdb";
import { config } from "../config";

export abstract class BaseRepository<T extends { id: string }> {

  constructor(protected collection: string) {

  }

  client = new DocumentClient(config.endpoint, {
    masterKey: config.primaryKey,
  });

  HttpStatusCodes = { NOTFOUND: 404 };
  databaseUrl = `dbs/${config.database.id}`;
  collectionUrl = `${this.databaseUrl}/colls/${this.collection}`;

  getDocument(document: T) {
    let documentUrl = `${this.collectionUrl}/docs/${document.id}`;
    console.log(`Getting document:\n${document.id}\n`);

    return new Promise((resolve, reject) => {
      this.client.readDocument(documentUrl, (err, result) => {
        if (err) {
          if (err.code == this.HttpStatusCodes.NOTFOUND) {

          } else {
            reject(err);
          }
        } else {
          resolve(result);
        }
      });
    });
  }

  createDocument(document: T) {
    console.log("Creating document: ", document);
    return new Promise((resolve, reject) => {
      this.client.createDocument(
        this.collectionUrl,
        document,
        (err, created) => {
          console.log("DONE", err, created);
          if (err) {
            console.error('Creating document failed', err);
            reject(err);
          }
          else {
            resolve(created);
          }
        }
      )
    }
    );
  }

  countCollection() {
    return new Promise((resolve, reject) => {
      this.client
        .queryDocuments(this.collectionUrl, `SELECT VALUE COUNT(1) FROM ${this.collection}`)
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

  replaceDocument(document: any) {
    let documentUrl = `${this.collectionUrl}/docs/${document.id}`;
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


  deleteDocument(id: any) {
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
}