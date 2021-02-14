import { IUser } from "../model/IUser";
import { IDataService } from "./IDataService";

export class DataService implements IDataService {

    private users: IUser[];

    public constructor() {
        this.users = this.getUsers();
    }

    public findUser(email:string):IUser{
        let users: IUser[] = this.users.filter((user: IUser) => {
            return (user.email == email)
        });

        if (users.length > 0) {
            return users[0];
        }

        return null;
    }

    public getUser():IUser {
        return this.users[0];
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
