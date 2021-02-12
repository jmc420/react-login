
import AuthenticationService from '../service/AuthenticationService';
import { IAuthenticationService } from '../service/IAuthenticationService';
import IAppContext from './IAppContext';

export default abstract class AbstractContext implements IAppContext {

    protected authenticationService: IAuthenticationService;

    protected static instance: IAppContext;

    protected constructor() {
        if (AbstractContext.instance != null) {
            throw Error("AppContext already instantiated");
        }
        this.authenticationService = new AuthenticationService();
    }

    public getAuthenticationService(): IAuthenticationService {
        return this.authenticationService;
    }

}

