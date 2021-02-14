import { IUser } from "../model/IUser";

export interface IDataService {
    findUser(email:string):IUser;
    getUser():IUser;
    saveUser(user:IUser);
}
