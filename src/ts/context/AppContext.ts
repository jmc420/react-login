import React from "react";

import AbstractContext from './AbstractContext';
import IAppContext from './IAppContext';

export default class AppContext extends AbstractContext {

  private constructor() {
    super();
  }

  public static getInstance(): IAppContext {
    if (AppContext.instance == null) {
      AppContext.instance = new AppContext();
    }
    return AppContext.instance;
  }
}

export const appContext: IAppContext = AppContext.getInstance();
export const context = React.createContext(appContext);
