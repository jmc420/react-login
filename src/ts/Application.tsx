import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';

import IAppContext from './context/IAppContext';
import { IAuthenticationResult, IAuthenticationService } from './service/IAuthenticationService';
import { LoginDialog } from './view/LoginDialog';
import { ProfileDialog } from './view/ProfileDialog';
import { IDataService } from './service/IDataService';


export interface IApplicationProps {
    appContext: IAppContext;
}

interface IAppState {
    authenticated: boolean;
    showProfile: boolean;
    toast: string;
}

const appStyles = makeStyles((theme) => ({
    icons: {
        display: 'flex',
    },
}));

export default function Application(props: IApplicationProps) {
    const classes = appStyles();
    const [state, setState] = useState<IAppState>(initialState());
    const appContext: IAppContext = props.appContext;
    const authService: IAuthenticationService = appContext.getAuthenticationService();
    const dataService: IDataService = appContext.getDataService();

    function handleLogin(result: IAuthenticationResult) {
        let toast = "Welcome " + result.user.first_name + " " + result.user.other_names;

        setState({ ...state, authenticated: true, toast: toast });
    }

    function hideProfile() {
        setState({ ...state, showProfile: false });
    }

    function hideToast() {
        setState({ ...state, toast: "" });
    }

    function initialState(): IAppState {
        return { authenticated: false, showProfile: false, toast: "" }
    }

    function showProfile() {
        setState({ ...state, showProfile: true });
    }

    return (
        <React.Fragment>
            <AppBar position="sticky">
                <div className={classes.icons}>
                    <Button color="default" disabled={!state.authenticated} onClick={() => { showProfile() }} >Profile</Button>
                </div>
            </AppBar>
            <Container>
                {!state.authenticated &&
                    <LoginDialog authService={authService} handleLogin={handleLogin} open={true} />
                }
                {state.showProfile &&
                    <ProfileDialog dataService={dataService} close={hideProfile} />
                }
                {state.toast != "" &&
                    <Snackbar open={true} autoHideDuration={4000} message={state.toast} onClose={hideToast} />
                }
            </Container>
        </React.Fragment>
    );
}