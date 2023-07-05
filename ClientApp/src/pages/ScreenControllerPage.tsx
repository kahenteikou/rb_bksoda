import * as React from 'react';
import { useWebSoc } from '../hooks/useWebSoc';

export default function ScreenControllerPage():React.ReactElement{
    const{data,send}=useWebSoc<string>("ws://localhost:8080/wsoc_rp",(m)=>{

    });
    return (
        <>
            Screen Controller
            <button onClick={()=>{
                send("aaaa");
            }}>
                aaa
            </button>
        </>
    );
}