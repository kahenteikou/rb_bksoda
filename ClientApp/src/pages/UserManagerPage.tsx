import * as React from 'react';
import { useAllUsers } from '../hooks/useAllUsers';
import { useEffect } from 'react';

export default function UserManagerPage(): React.ReactElement {
    const {getAllUsers,users}=useAllUsers();
    useEffect(()=>{
        getAllUsers();
    },[]);
    return (
        <>
        UserManagerPage<br/>
        <ul>
            {
                users.map((user)=>
                <><li>username:{user.username}</li>
                <br/>
                <li>uuid:{user.uuid}</li>
                </>)
            }
        </ul></>
    );
}