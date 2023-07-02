import * as React from 'react';
import { useWebSoc } from '../hooks/useWebSoc';

export default function ScreenControllerPage():React.ReactElement{
    const{data,send}=useWebSoc<string>("ws://localhost:8080/api/v1/websocket/receiver/msg_1",(m)=>{

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