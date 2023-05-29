import * as React from 'react';
import { useAllUsers } from '../hooks/useAllUsers';
import { useEffect } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function UserManagerPage(): React.ReactElement {
    const {getAllUsers,users}=useAllUsers();
    useEffect(()=>{
        getAllUsers();
    },[]);
    return (
        <>
        <h1>UserManagerPage</h1><br/>
        {/*
        <ul>
            {
                users.map((user)=>
                <><li>username:{user.username}</li>
                <br/>
                <li>uuid:{user.uuid}</li>
                </>)
            }
        </ul>*/}
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
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}