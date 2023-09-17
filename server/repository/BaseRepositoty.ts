import { DocumentClient } from "documentdb";
import {Model, Document as MongooesDocument} from 'mongoose';
import mongoose from 'mongoose';
import { IBaseModel, IBook } from "../models/Book";

export abstract class BaseRepository<T extends IBaseModel> {

  constructor(protected collection: string) {
    console.log('BaseRepository constructor')
  }

  getById(modelId: string) {
  
  }

  async createDocument(document: Model<T>) {    
    console.log("Creating document: ", document);
    // await document.save();
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