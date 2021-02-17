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
    user: IUser;
}

interface IField {
    label: string;
    id: string;
    parent: any;
}

const fields: IField[] = [
    { label: "First Name", id: 'first_name', parent: null },
    { label: "Other Names", id: 'other_names', parent: null },
    { label: "Town", id: 'town', parent: "address" },
    { label: "County", id: 'county', parent: "address" },
    { label: "PostCode", id: 'postcode', parent: "address" },
    { label: "Mobile", id: 'mobile', parent: null },
    { label: "Email", id: 'email', parent: null },
    { label: "Company", id: 'company', parent: null },
    { label: "Contact", id: 'contact', parent: "preferences" }
]

export function ProfileDialog(props: IProfileDialogProps) {
    const [state, setState] = useState<IProfileState>(initialState());

    function action() {
        if (state.edit) {
            save();
        }
        else {
            edit();
        }
    }

    function cancel() {
        if (state.edit) {
            cancelEdit();
        }
        else {
            props.close();
        }
    }

    function cancelEdit() {
        let user: IUser = props.dataService.getUser();

        setState({ ...state, edit: false, user: Object.assign({}, user) });
    }

    function changeField(e, field) {
        let user: IUser = state.user;
        let id = field.id;
        let parent = field.parent;

        if (parent) {
            user[parent][id] = e.target.value;
        }
        else {
            user[id] = e.target.value;
        }
    
        setState({ ...state, user: user });
    }

    function edit() {
        setState({ ...state, edit: true });
    }

    function initialState(): IProfileState {
        let user: IUser = props.dataService.getUser();

        return { edit: false, user: Object.assign({}, user) };
    }

    function save() {
        props.dataService.saveUser(state.user);
        props.close();
    }

    let actionButtonTitle = (state.edit) ? "Save" : "Edit";

    return (
        <div>
            <Dialog
                fullWidth={false}
                maxWidth="md"
                open={true}
                aria-labelledby="save-dialog-title"
                aria-describedby="save-dialog-description">
                <DialogTitle id="save-dialog-title">Edit</DialogTitle>
                <DialogContent dividers>
                    {
                        fields.map((field: IField, index) => {
                            let id = field.id;
                            let parent = field.parent;
                            let value = (parent) ? state.user[parent][id]: state.user[id];
                            let placeholder = "Enter "+field.label;

                            return <TextField autoFocus placeholder={placeholder} margin="dense" disabled={!state.edit} fullWidth label={field.label} onChange={(e) => { changeField(e, field) }} variant="outlined" value={value} />
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={() => { cancel() }}>Cancel</Button>
                    <Button color="primary" autoFocus onClick={() => { action() }}>{actionButtonTitle}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}