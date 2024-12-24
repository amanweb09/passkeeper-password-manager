export interface User {
    name: string,
    email: string, 
    password: string
}

export interface MongoUser extends User {
    _id: string
}