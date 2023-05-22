import * as React from 'react';

export default function UserManagerPage(): React.ReactElement {
    const [users,setUsers]=React.useState<any>([]);
    React.useEffect(()=>{
        fetch("http://localhost:8080/api/v1/users/",{method:"GET"})
        .then((res)=>res.json())
        .then((data)=>{
            setUsers(data);
        });
    },[]);
    return (
        <>
        UserManagerPage<br/>
        <ul>
            {
                users.map((user: { username: string; })=>
                <><li>username:{user.username}</li>
                <li></li>
                </>)
            }
        </ul></>
    );
}