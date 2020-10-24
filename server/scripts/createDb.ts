import { config } from '../config';
import {repository} from '../repository/repository';

repository.getDatabase()
    .then(() => repository.getCollection())
    .then(() => {
        config.documents.forEach(book => {
            repository.getDocument(book)
        });
    })
    .then(() => { repository.exit(`Completed successfully`); })
    .catch((error) => { repository.exit(`Completed with error ${JSON.stringify(error)}`) });