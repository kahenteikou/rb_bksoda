import { WebSocClient } from "./WebSocClient"
import * as React from 'react';

type WebSocProviderProps={
    client:WebSocClient;
    children:React.ReactNode;
}
const WebSocContext=React.createContext<WebSocClient|null>(null);
export const WebSocProvider=({client,children}:WebSocProviderProps)=>{
    React.useEffect(()=>{
        client.open();
        return ()=>{
            client.close();
        }
    },[client])
    return <WebSocContext.Provider value={client}>{children}</WebSocContext.Provider>
}