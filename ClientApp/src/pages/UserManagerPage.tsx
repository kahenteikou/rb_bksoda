import * as React from 'react';
import { useAllUsers } from '../hooks/useAllUsers';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { User } from '../types/User';
import { User_Req } from '../types/User_Req';

export default function UserManagerPage(): React.ReactElement {
    const {getAllUsers,users}=useAllUsers();
    const [editModalIsOpen,seteditModalIsOpen]=useState(false);
    const [selectedUser,setselectedUser]=useState<User>();
    const openEditmodal=(user:User)=>{
        setselectedUser(user);
        seteditModalIsOpen(true);
    };
    useEffect(()=>{
        getAllUsers();
    },[]);
    function post_edited_value_and_refresh(){
        //console.log("after log:",selectedUser);
        let request_user:User_Req={
            username:selectedUser?.username,
            description:selectedUser?.description,
            displayname:selectedUser?.displayname
        }
        closeModal();
    }
    const closeModal=()=>{
        seteditModalIsOpen(false);
    }
    return (
        <>
        <div id='app'>
        <h1>UserManagerPage</h1><br/>
        <TableContainer component={Paper}>
            <Table sx={{minWidth:650}} aria-label="table">
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user)=>(
                        <TableRow key={user.uuid}>
                            <TableCell component="th" scope="row">
                                {user.username}
                            </TableCell>
                            <TableCell align="right">{user.displayname}</TableCell>
                            <TableCell align="right">{user.uuid}</TableCell>
                            <TableCell align="right">{user.description}</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="edit" onClick={()=>{
                                    console.log("edit: %s",user.uuid );
                                    openEditmodal(user);
                                }}>
                                    <EditIcon />
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
                    <br/>
                    {selectedUser?.uuid}
                </DialogContentText>
                <TextField margin="dense" label="ユーザー名" fullWidth variant='standard' value={selectedUser?.username}
                onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
                    setselectedUser({...selectedUser,username:e.target.value})
                }} />
                <TextField margin="dense" label="表示名" fullWidth variant='standard' value={selectedUser?.displayname}
                onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
                    setselectedUser({...selectedUser,displayname:e.target.value})
                }} />
                <TextField margin="dense" label="説明" fullWidth variant='standard' value={selectedUser?.description}
                onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
                    setselectedUser({...selectedUser,description:e.target.value})
                }} />

            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={post_edited_value_and_refresh}>Apply</Button>
            </DialogActions>
        </Dialog>
        </div>
        </>
    );
}