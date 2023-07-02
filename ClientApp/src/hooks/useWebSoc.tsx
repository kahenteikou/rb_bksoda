import React from "react";
import { SubScriber } from "../controller/wsoc/WebSocClient";
import { useWebSocClient } from "../controller/wsoc/WebSocProvider"

export const useWebSoc=<R=string,S=R>(
    url:string,
    onMessage:(msg:R)=>void
)=>{
    const client=useWebSocClient();
    const subscribe=React.useCallback(
        (onStoreChange:()=>void)=>{
            client.subscribe(url,[onMessage as SubScriber,onStoreChange]);
            return()=>{
                client.unsubscribe(url,[onMessage as SubScriber,onStoreChange]);
            }
        },
        [client,url,onMessage]
    )
    const getSnapshot=React.useCallback(()=>client.get<R>(url),[client,url]);
    const data=React.useSyncExternalStore(subscribe,getSnapshot);
    const send=React.useCallback(
        (msg:S)=>{
            client.send(url,msg);
        },
        [client,url]
    );
    return{
        data,send
    };
}