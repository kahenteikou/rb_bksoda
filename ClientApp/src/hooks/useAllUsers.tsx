import { useState } from "react";
import { User } from "../types/User";

export const useAllUsers=()=>{
    const[users,setUsers]=useState<Array<User>>([]);
    const getAllUsers=()=>{
        fetch("http://localhost:8080/api/v1/users/",{method:"GET"})
            .then((res)=>res.json())
            .then((data)=>{
                setUsers(data);
            });
    };
    return{getAllUsers,users};
};