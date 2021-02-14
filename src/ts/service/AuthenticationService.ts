import { IUser } from '../model/IUser';
import { AuthenticationResult, IAuthenticationResult, IAuthenticationService } from './IAuthenticationService';
import { IDataService } from './IDataService';

export default class AuthenticationService implements IAuthenticationService {

    private dataService:IDataService;

    public constructor(dataService:IDataService) {
        this.dataService = dataService;
    }

    public login(email: string, password: string, callBack: AuthenticationResult) {
        let user:IUser = this.dataService.findUser(email);
        let result: IAuthenticationResult = {
            error: true,
            user: null,
            message: "Invalid user or password"
        };

        if (user != null) {
            result.error = false;
            result.user = user;
        }
        callBack(result);
    }
}
