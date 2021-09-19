import { DocumentClient } from "documentdb";
import { config } from "../config";

class UserRepositoty {

    client = new DocumentClient(config.endpoint, {
        masterKey: config.primaryKey,
    });

    HttpStatusCodes = { NOTFOUND: 404 };
    databaseUrl = `dbs/${config.database.id}`;
    collectionUrl = `${this.databaseUrl}/colls/Users`;


    getDocument(document: any) {
        let documentUrl = `${this.collectionUrl}/docs/${document.id}`;
        console.log(`Getting document:\n${document.id}\n`);

        return new Promise((resolve, reject) => {
            this.client.readDocument(documentUrl, (err, result) => {
                if (err) {
                    if (err.code == this.HttpStatusCodes.NOTFOUND) {

                    } else {
                        reject(err);
                    }
                } else {
                    resolve(result);
                }
            });
        });
    }

    createDocument(document: any) {
        console.log("Creating document: ", document);
        return new Promise((resolve, reject) => {
            this.client.createDocument(
                this.collectionUrl,
                document,
                (err, created) => {
                    console.log("DONE", err, created);
                    if (err) {
                        console.error('Creating document failed', err);
                        reject(err);
                    }
                    else {
                        resolve(created);
                    }
                }
            )
        }
        );
    }
}

export const userRepository = new UserRepositoty();