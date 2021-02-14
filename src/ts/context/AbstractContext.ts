
import AuthenticationService from '../service/AuthenticationService';
import { DataService } from '../service/DataService';
import { IAuthenticationService } from '../service/IAuthenticationService';
import { IDataService } from '../service/IDataService';
import IAppContext from './IAppContext';

export default abstract class AbstractContext implements IAppContext {

    protected authenticationService: IAuthenticationService;
    protected dataService: IDataService;

    protected static instance: IAppContext;

    protected constructor() {
        if (AbstractContext.instance != null) {
            throw Error("AppContext already instantiated");
        }
        this.dataService = new DataService();
        this.authenticationService = new AuthenticationService(this.dataService);
    }

    public getAuthenticationService(): IAuthenticationService {
        return this.authenticationService;
    }

    public getDataService():IDataService {
        return this.dataService;
    }

}

