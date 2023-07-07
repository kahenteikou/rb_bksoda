import * as React from 'react';
import { WebSocClient } from '../controller/wsoc/WebSocClient';
import { useWebSoc } from '../hooks/useWebSoc';

export default function TargetScreenPage():React.ReactElement{
    const{data,send}=useWebSoc<string>("ws://localhost:8080/wsoc_rp",(m)=>{
        console.log(m)
    });
    return (
            
        <>
            
        </>
    );
}