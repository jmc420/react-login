import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { IUser } from '../model/IUser';
import { IDataService } from '../service/IDataService';

export interface IProfileDialogProps {
    dataService: IDataService;
    close: Function;
}

interface IProfileState {
    edit: boolean;
    firstName: string;
    otherName: string;
    user: IUser;
}

export function ProfileDialog(props: IProfileDialogProps) {
    const [state, setState] = useState<IProfileState>(initialState());

    function cancelEdit() {
        let user:IUser = props.dataService.getUser();

        setState({ ...state, edit: false, firstName: user.first_name, otherName: user.other_names});
    }

    function changeFirstName(e) {
        setState({ ...state, firstName: e.target.value });
    }

    function changeOtherName(e) {
        setState({ ...state, otherName: e.target.value });
    }

    function edit() {
        setState({ ...state, edit: true });
    }

    function initialState(): IProfileState {
        let user:IUser = props.dataService.getUser();

        return { edit: false, firstName: user.first_name, otherName: user.other_names, user: user };
    }

    function save() {
        let user:IUser = props.dataService.getUser();

        user.first_name = state.firstName;
        user.other_names = state.otherName;
        props.dataService.saveUser(user);
        props.close();
    }

    return (
        <div>
            {!state.edit &&
                <Dialog
                    fullWidth={false}
                    maxWidth="md"
                    open={true}
                    aria-labelledby="save-dialog-title"
                    aria-describedby="save-dialog-description">
                    <DialogTitle id="save-dialog-title">View</DialogTitle>
                    <DialogContent dividers>
                        <TextField autoFocus margin="dense" disabled={true} fullWidth variant="outlined" value={state.firstName} />
                        <TextField autoFocus margin="dense" disabled={true} fullWidth variant="outlined" value={state.otherName} />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" autoFocus onClick={() => { props.close() }}>Cancel</Button>
                        <Button color="primary" autoFocus onClick={() => { edit() }}>Edit</Button>
                    </DialogActions>
                </Dialog>
            }
            {state.edit &&
                <Dialog
                    fullWidth={false}
                    maxWidth="md"
                    open={true}
                    aria-labelledby="save-dialog-title"
                    aria-describedby="save-dialog-description">
                    <DialogTitle id="save-dialog-title">Edit</DialogTitle>
                    <DialogContent dividers>
                        <TextField autoFocus margin="dense" fullWidth onChange={changeFirstName}  variant="outlined" value={state.firstName} />
                        <TextField autoFocus margin="dense" fullWidth onChange={changeOtherName} variant="outlined" value={state.otherName} />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" autoFocus onClick={() => { cancelEdit() }}>Cancel</Button>
                        <Button color="primary" autoFocus onClick={() => { save() }}>Save</Button>
                    </DialogActions>
                </Dialog>
            }
        </div>
    )

}