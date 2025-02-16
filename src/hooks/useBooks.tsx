import { useQuery } from "@tanstack/react-query";
import { IBooksRequest } from "../common/models/IBooksRequest";
import {getBooks} from '../helpers/bookservice';

export const useBooks = (payload: IBooksRequest) => {
    return useQuery({
        queryKey: ['getbooks', payload],
        queryFn: () => getBooks(payload)
    });
}