import {Schema, model} from 'mongoose';

const BookSchema = new Schema(
  {
    id: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    title: {type: String},
    author: {type: String},
    coverImageUrl: {type: String},
    productId: {type: String},
    publisher: {type: String},
    synopsis: {type: String},
    notes: {type: String},
    status: {type: Number},
    pageCount: {type: Number}
  },
  {timestamps: true}
);

export const Book = model("Book", BookSchema);