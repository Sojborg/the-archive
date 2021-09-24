import { useQuery } from "react-query";
import { IBooksRequest } from "../common/models/IBooksRequest";
import {getBooks} from '../helpers/bookservice';

export const useBooks = (payload: IBooksRequest) => {
    return useQuery(['getbooks', payload], () => {
        return getBooks(payload);
    });
}