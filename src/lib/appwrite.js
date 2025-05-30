import { Client, Account} from 'appwrite';

export const client = new Client();

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!endpoint || endpoint.trim() === "") {
    console.error(
        "Error: VITE_APPWRITE_ENDPOINT is missing or empty. " +
        "Please check your .env file or environment configuration. " +
        "Appwrite initialization might fail."
    );
}

if (!projectId || projectId.trim() === "") {
    console.error(
        "Error: VITE_APPWRITE_PROJECT_ID is missing or empty. " +
        "Please check your .env file or environment configuration. " +
        "Appwrite initialization might fail."
    );
}

client
    .setEndpoint(endpoint)
    .setProject(projectId);

export const account = new Account(client);
export { ID } from 'appwrite';
