import React, { useEffect, useRef, useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { AuthenticationResult, IAuthenticationResult, IAuthenticationService } from '../service/IAuthenticationService';

export interface ILoginDialogProps {
    authService: IAuthenticationService;
    handleLogin: AuthenticationResult;
    open: boolean;
}

interface IDialogState {
    authError: string;
    email: string;
    emailError: boolean;
    emailErrorMessage: string;
    password: string;
    passwordError: boolean;
    passwordErrorMessage: string;
}

export function LoginDialog(props: ILoginDialogProps) {
    const [state, setState] = useState<IDialogState>(initialState());
    const emailRefInput = useRef(null);

    useEffect(() => {
        setState(initialState());
    }, [props.open]);

    function changeEmail(e) {
        setState({ ...state, emailError: false, emailErrorMessage: "", email: e.target.value });
    }

    function changePassword(e) {
        setState({ ...state, passwordError: false, passwordErrorMessage: "", password: e.target.value });
    }

    function handleLogin() {
        if (validate()) {
            let email: string = state.email;
            let password: string = state.password;

            props.authService.login(email, password, (result: IAuthenticationResult) => {
                if (result.error) {
                    setState({ ...state, authError: result.message });
                }
                else {
                    props.handleLogin(result);
                }
            });
        }
    }

    function initialState(): IDialogState {
        return { authError: "", email: "", emailError: false, emailErrorMessage: "", password: "", passwordError: false, passwordErrorMessage: "" }
    }

    function login(email: string, password: string) {

        props.authService.login(email, password, (result: IAuthenticationResult) => {
            if (result.error) {
                setState({ ...state, authError: result.message });
            }
            else {
                props.handleLogin(result);
            }
        });
    }

    function validate() {
        return validateEmail() && validatePassword();
    }

    function validateEmail(): boolean {
        let email: string = state.email;

        if (email == "" || !emailRefInput.current.checkValidity() || (email.indexOf("+") >= 0)) {
            setState({ ...state, emailError: true, emailErrorMessage: "Invalid email" });
            return false;
        }

        return true;
    }

    function validatePassword(): boolean {
        let password: string = state.password;

        if (password == "") {
            setState({ ...state, passwordError: true, passwordErrorMessage: "Invalid password" });
            return false;
        }
        return true;
    }

    return (
        <div>
            {props.open &&
                <Dialog
                    fullWidth={false}
                    maxWidth="md"
                    open={props.open}
                    aria-labelledby="save-dialog-title"
                    aria-describedby="save-dialog-description">
                    <DialogTitle id="save-dialog-title">Login</DialogTitle>
                    <DialogContent dividers>
                        <TextField id="email" autoFocus error={state.emailError} helperText={state.emailErrorMessage} inputRef={emailRefInput} onChange={changeEmail} margin="dense" label="Enter email" type="email" fullWidth variant="outlined" value={state.email} />
                        <TextField id="password" autoFocus error={state.passwordError} helperText={state.passwordErrorMessage} onChange={changePassword} margin="dense" label="Enter password" type="password" fullWidth variant="outlined" value={state.password} />
                        {state.authError != "" && <Alert severity="error">{state.authError}</Alert>}
                    </DialogContent>
                    <DialogActions>
                        <Button id="loginButton" color="primary" autoFocus onClick={() => { handleLogin(); }}>Login</Button>
                    </DialogActions>
                </Dialog>
            }
        </div>
    );

}