
import { IAuthenticationService } from '../service/IAuthenticationService';
import { IDataService } from '../service/IDataService';

export interface IAppContext {
  getAuthenticationService():IAuthenticationService;
  getDataService():IDataService;
}

export default IAppContext;
