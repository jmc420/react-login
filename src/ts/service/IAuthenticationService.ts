import { IUser } from "../model/IUser";

export interface IAuthenticationResult {
    error: boolean;
    message: string;
    user: IUser;
}

export type AuthenticationResult = (result: IAuthenticationResult) => void;

export interface IAuthenticationService {
    getUser():IUser;
    login(email: string, password: string, callBack: AuthenticationResult);
    saveUser(user:IUser);
}
