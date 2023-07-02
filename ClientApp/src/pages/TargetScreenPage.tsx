import * as React from 'react';
import { WebSocClient } from '../controller/wsoc/WebSocClient';

export default function TargetScreenPage():React.ReactElement{
    const client = new WebSocClient({
        urls:["ws://localhost:8080/api/v1/websocket/msg_1"]
    })
    return (
            
        <>
            Target Screen
        </>
    );
}