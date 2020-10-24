export enum BookStatus {
  ToRead,
  Reading,
  Done
}

export interface IBooksResponse {
  books: IBook[];
  numberOfBooks: number;
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  productId: string;
  pageCount: number;
  publisher: string;
  synopsis: string;
  notes?: string;
  status: BookStatus;
}