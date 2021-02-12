
import { IAuthenticationService } from '../service/IAuthenticationService';

export interface IAppContext {
  getAuthenticationService():IAuthenticationService;
}

export default IAppContext;
