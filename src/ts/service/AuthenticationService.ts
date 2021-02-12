import { IUser } from '../model/IUser';
import { AuthenticationResult, IAuthenticationResult, IAuthenticationService } from './IAuthenticationService';

export default class AuthenticationService implements IAuthenticationService {

    private users: IUser[];

    public constructor() {
        this.users = this.getUsers();
    }

    public getUser():IUser {
        return this.users[0];
    }

    public login(email: string, password: string, callBack: AuthenticationResult) {
        let users: IUser[] = this.users.filter((user: IUser) => {
            return (user.email == email && user.password == password)
        });

        let result: IAuthenticationResult = {
            error: true,
            user: null,
            message: "Not found"
        }
        if (users.length > 0) {
            result.error = false;
            result.user = users[0];
        }
        callBack(result);
    }

    public saveUser(user:IUser) {
        this.users[0] = user;
    }

    private getUsers(): IUser[] {
        return [
            {
                "id": "1",
                "first_name": "Jon",
                "other_names": "Williams",
                "address": {
                    "street": "1 Mill Street",
                    "town": "Northampton",
                    "county": "Northamponshire",
                    "postcode": "NU7 JK8"
                },
                "mobile": "08982 92829",
                "email": "jwlll@gmail.com",
                "password": "hello",
                "company": "Xerini",
                "preferences": {
                    "contact": ["mail", "sms"]
                }
            }
        ];
    }
}
