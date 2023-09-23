// import { config } from '../config';
import { bookRepository } from '../repository/BookRepository';

// const createBooksTable = () => {
//     repository.getDatabase()
//         .then(() => repository.getCollection())
//         .then(() => {
//             config.documents.forEach(book => {
//                 bookRepository.getDocument(book)
//             });
//         })
//         .then(() => { repository.exit(`Completed successfully`); })
//         .catch((error) => { repository.exit(`Completed with error ${JSON.stringify(error)}`) });
// }

// const createUserTable = () => {
//     repository.createTable('Users');
// }

// createUserTable();