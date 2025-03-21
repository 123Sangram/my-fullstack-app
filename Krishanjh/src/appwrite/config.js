import {Client , Account,Databases} from 'appwrite'

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')  // Your API Endpoint
    .setProject('666a3ef100135c0a8149')  // Your project ID

export const account = new Account(client)

export const databases = new Databases(client)

