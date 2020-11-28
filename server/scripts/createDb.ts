import { config } from '../config';
import {repository} from '../repository/repository';

const createBooksTable = () => {
    repository.getDatabase()
        .then(() => repository.getCollection())
        .then(() => {
            config.documents.forEach(book => {
                repository.getDocument(book)
            });
        })
        .then(() => { repository.exit(`Completed successfully`); })
        .catch((error) => { repository.exit(`Completed with error ${JSON.stringify(error)}`) });
}

const createUserTable = () => {
    repository.createTable('Users');
}

createUserTable();