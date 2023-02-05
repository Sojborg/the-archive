import { DocumentClient } from "documentdb";
import {Document as MongooesDocument} from 'mongoose';
import mongoose from 'mongoose';

export abstract class BaseRepository<T extends MongooesDocument> {

  constructor(protected collection: string) {

    mongoose.connect('mongodb+srv://sojborg:minHemmeligekodeerbedst00@cluster0.ymytk.mongodb.net/thearchive', {
    });
  }

  // client = new DocumentClient(config.endpoint, {
  //   masterKey: config.primaryKey,
  // });

  // HttpStatusCodes = { NOTFOUND: 404 };
  // databaseUrl = `dbs/${config.database.id}`;
  // collectionUrl = `${this.databaseUrl}/colls/${this.collection}`;

  getDocument(document: T) {
    // let documentUrl = `${this.collectionUrl}/docs/${document.id}`;
    // console.log(`Getting document:\n${document.id}\n`);

    // return new Promise((resolve, reject) => {
    //   this.client.readDocument(documentUrl, (err, result) => {
    //     if (err) {
    //       if (err.code == this.HttpStatusCodes.NOTFOUND) {

    //       } else {
    //         reject(err);
    //       }
    //     } else {
    //       resolve(result);
    //     }
    //   });
    // });
  }

  async createDocument(document: T) {
    console.log("Creating document: ", document);
    await document.save((err) => {
      if (err) {
        console.error('Could not create document', err);
      }

      console.log('Document saved!');
    });
  }

  countCollection() {
    // return new Promise((resolve, reject) => {
    //   this.client
    //     .queryDocuments(this.collectionUrl, `SELECT VALUE COUNT(1) FROM ${this.collection}`)
    //     .toArray((err, results) => {
    //       if (err) reject(err);
    //       else {
    //         for (var queryResult of results) {
    //           let resultString = JSON.stringify(queryResult);
    //           console.log(`\tQuery returned ${resultString}`);
    //         }
    //         console.log();
    //         resolve(results);
    //       }
    //     });
    // });
  }

  replaceDocument(document: any) {
    // let documentUrl = `${this.collectionUrl}/docs/${document.id}`;
    // console.log(`Replacing document:\n${document.id}\n`);

    // return new Promise((resolve, reject) => {
    //   this.client.replaceDocument(documentUrl, document, (err, result) => {
    //     if (err) reject(err);
    //     else {
    //       resolve(result);
    //     }
    //   });
    // });
  }


  deleteDocument(id: any) {
    // let documentUrl = `${this.collectionUrl}/docs/${id}`;
    // console.log(`Deleting document:\n${id}\n`);

    // return new Promise((resolve, reject) => {
    //   this.client.deleteDocument(documentUrl, (err, result) => {
    //     if (err) reject(err);
    //     else {
    //       resolve(result);
    //     }
    //   });
    // });
  }
}