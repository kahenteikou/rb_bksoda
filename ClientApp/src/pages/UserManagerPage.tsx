import * as React from 'react';
import { useAllUsers } from '../hooks/useAllUsers';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, IconButton, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../types/User';
import AddIcon from '@mui/icons-material/Add';
import { User_Req } from '../types/User_Req';

export default function UserManagerPage(): React.ReactElement {
    const { getAllUsers, users } = useAllUsers();
    const [editModalIsOpen, seteditModalIsOpen] = useState(false);
    const [addModalIsOpen, setaddModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
    const [selectedUser, setselectedUser] = useState<User>();
    const [addUser_cache, set_addUser_cache] = useState<User_Req>();
    const openEditmodal = (user: User) => {
        setselectedUser(user);
        seteditModalIsOpen(true);
    };
    const openDeletemodal = (user: User) => {
        setselectedUser(user);
        setdeleteModalIsOpen(true);
    };
    const openAddmodal=()=>{
        set_addUser_cache({
            username:"",
            displayname:"",
            description:""
        });
        setaddModalIsOpen(true);
    };
    useEffect(() => {
        getAllUsers();
    }, []);
    function post_edited_value_and_refresh() {
        //console.log("after log:",selectedUser);
        let request_user: User_Req = {
            username: selectedUser?.username,
            description: selectedUser?.description,
            displayname: selectedUser?.displayname
        }
        console.log("after log:", request_user);
        fetch(
            "http://localhost:8080/api/v1/users/" + selectedUser?.uuid,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request_user)
            }
        ).then((rp) => {
            getAllUsers();
        }, (err) => {
            console.error(err)
        });
        closeModal();
    }
    const closeModal = () => {
        seteditModalIsOpen(false);
    }
    const close_deletemodal = () => {
        setdeleteModalIsOpen(false);
    }
    const close_add_modal=()=>{
        setaddModalIsOpen(false);
    }
    return (
        <>
            <div id='app'>
                <h1>UserManagerPage</h1><br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell align="right">
                                    displayname
                                </TableCell>
                                <TableCell align="right">
                                    UUID
                                </TableCell>
                                <TableCell align="right">
                                    description
                                </TableCell>
                                <TableCell align="right">
                                    Edit
                                </TableCell>
                                <TableCell align="right">
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.uuid}>
                                    <TableCell component="th" scope="row">
                                        {user.username}
                                    </TableCell>
                                    <TableCell align="right">{user.displayname}</TableCell>
                                    <TableCell align="right">{user.uuid}</TableCell>
                                    <TableCell align="right">{user.description}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="edit" onClick={() => {
                                            console.log("edit: %s", user.uuid);
                                            openEditmodal(user);
                                        }}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="delete" onClick={() => {
                                            console.log("delete: %s", user.uuid);
                                            //openEditmodal(user);
                                            openDeletemodal(user);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={editModalIsOpen} onClose={closeModal}>
                    <DialogTitle>ユーザー編集</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ユーザー編集機能です。あああああああああああああああああああああああああああああああああああああああああ
                            <br />
                            {selectedUser?.uuid}
                        </DialogContentText>
                        <TextField margin="dense" label="ユーザー名" fullWidth variant='standard' value={selectedUser?.username}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                setselectedUser({ ...selectedUser, username: e.target.value })
                            }} />
                        <TextField margin="dense" label="表示名" fullWidth variant='standard' value={selectedUser?.displayname}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                setselectedUser({ ...selectedUser, displayname: e.target.value })
                            }} />
                        <TextField margin="dense" label="説明" fullWidth variant='standard' value={selectedUser?.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                setselectedUser({ ...selectedUser, description: e.target.value })
                            }} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button onClick={post_edited_value_and_refresh}>Apply</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={addModalIsOpen} onClose={close_add_modal}>
                    <DialogTitle>ユーザー追加</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ユーザー追加あああああああああああああああああああああああああああああ
                            <br />
                        </DialogContentText>
                        <TextField margin="dense" label="ユーザー名" fullWidth variant='standard' value={addUser_cache?.username}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                set_addUser_cache({ ...addUser_cache, username: e.target.value })
                            }} />
                        <TextField margin="dense" label="表示名" fullWidth variant='standard' value={addUser_cache?.displayname}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                set_addUser_cache({ ...addUser_cache, displayname: e.target.value })
                            }} />
                        <TextField margin="dense" label="説明" fullWidth variant='standard' value={addUser_cache?.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                set_addUser_cache({ ...addUser_cache, description: e.target.value })
                            }} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={close_add_modal}>Cancel</Button>
                        {/*<Button onClick={post_edited_value_and_refresh}>Apply</Button>*/}
                    </DialogActions>
                </Dialog>
                <Dialog open={deleteModalIsOpen} onClose={close_deletemodal}>
                    <DialogTitle>
                        ユーザーを削除しますか？
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {selectedUser?.username},{selectedUser?.uuid}を削除しますか?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={close_deletemodal}>Cancel</Button>
                        <Button onClick={() => {
                            fetch(
                                "http://localhost:8080/api/v1/users/" + selectedUser?.uuid,
                                {
                                    method: "DELETE"
                                }
                            ).then((rp) => {
                                getAllUsers();
                            }, (err) => {
                                console.error(err)
                            });
                            close_deletemodal();
                        }}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <br/><br/>
                <center>
                    <Fab color="primary" aria-label="add" onClick={()=>{
                        //console.log("clicked add button");
                        openAddmodal();
                    }}>
                        <AddIcon />
                    </Fab>
                </center>
            </div>
        </>
    );
}