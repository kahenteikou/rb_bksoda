import { createTheme } from '@mui/material/styles';
import * as React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

export default function AdminPage(): React.ReactElement {
    /*const [users,setUsers]=React.useState<any>([]);
    React.useEffect(()=>{
        fetch("http://localhost:8080/api/v1/users/",{method:"GET"})
        .then((res)=>res.json())
        .then((data)=>{
            setUsers(data);
        });
    },[]);*/
    
    const theme = createTheme();
    const dataProvider = jsonServerProvider('http://localhost:8080/api/v1');
    return (
        /*
        <>
        UserManagerPage<br/>
        <ul>
            {
                users.map((user: { username: string; })=>
                <><li>username:{user.username}</li>
                <li></li>
                </>)
            }
        </ul></>*/
        <Admin theme={theme} dataProvider={dataProvider} basename="/admin">
            <Resource name="users" list={ListGuesser} />
        </Admin>
    );
}