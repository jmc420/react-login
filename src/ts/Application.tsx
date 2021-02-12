import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import IAppContext from './context/IAppContext';
import { IAuthenticationResult, IAuthenticationService } from './service/IAuthenticationService';
import { LoginDialog } from './view/LoginDialog';
import { ProfileDialog } from './view/ProfileDialog';


export interface IApplicationProps {
    appContext: IAppContext;
}

interface IAppState {
    authenticated: boolean;
    showProfile: boolean;
}

const appStyles = makeStyles((theme) => ({
    icons: {
        display: 'flex',
    },
}));

export default function Application(props: IApplicationProps) {
    const classes = appStyles();
    const [state, setState] = useState<IAppState>(initialState());
    const authService: IAuthenticationService = props.appContext.getAuthenticationService();

    function handleLogin(result: IAuthenticationResult) {
        setState({ ...state, authenticated: true });
    }

    function hideProfile() {
        setState({ ...state, showProfile: false });
    }

    function initialState(): IAppState {
        return { authenticated: false, showProfile: false }
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
                    <ProfileDialog authService={authService} close={hideProfile}/>
                }
            </Container>
        </React.Fragment>
    );
}