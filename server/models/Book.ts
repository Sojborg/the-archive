import { Schema, model } from 'mongoose';

export interface IBaseModel {
  _id: string;
}

export interface IBook extends IBaseModel {
  userId: string;
  title: string;
  author: string;
  coverImageUrl: string;
  productId: string;
  publisher: string;
  synopsis: string;
  notes: string;
  status: number;
  pageCount: number;
}

export const BookSchema = new Schema<IBook>(
  {
    userId: { type: String, required: true },
    title: { type: String },
    author: { type: String },
    coverImageUrl: { type: String },
    productId: { type: String },
    publisher: { type: String },
    synopsis: { type: String },
    notes: { type: String },
    status: { type: Number },
    pageCount: { type: Number }
  },
  { timestamps: true }
);

export const Book = model("Book", BookSchema);