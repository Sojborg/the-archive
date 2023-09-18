import {Model} from 'mongoose';
import { IBaseModel } from "../models/Book";

export abstract class BaseRepository<T extends IBaseModel> {

  constructor(protected collection: string) {
    console.log('BaseRepository constructor')
  }

  getById(modelId: string) {
  
  }

  async createDocument(document: Model<T>) {   
  }

  countCollection() {
  }

  replaceDocument(document: any) {
  }


  deleteDocument(id: any) {
  }
}