import { json } from "react-router";
import ReconnectingWebSocket from "reconnecting-websocket";

export type SubScriber<T=unknown>=(message:T)=>void|(()=>void);
export type WebSocClientConf={
    urls:string[]
}
export class WebSocClient{
    private readonly conf:WebSocClientConf;
    private readonly subscribers=new Map<string,Set<SubScriber>>()
    private readonly wsocs=new Map<string,ReconnectingWebSocket>();
    private data:{[url:string]:unknown}|undefined;
    constructor(config:WebSocClientConf){
        this.conf=config;
        const{urls}=config;
        urls.forEach((url)=>{
            this.subscribers.set(url,new Set());
        });
    }
    open=()=>{
        const{urls}=this.conf;
        urls.forEach((url)=>{
            const ws=new ReconnectingWebSocket(url);
            ws.addEventListener("message",(ev:MessageEvent<string>)=>{
                const pData=JSON.parse(ev.data);
                this.data={...this.data,[url]:pData};
                this.subscribers.get(url)?.forEach((s)=>s(pData));
            });
            this.wsocs.set(url,ws);
        });
    }
    get=<T,>(url:string)=>this.data?.[url] as T;
    send=(url:string,msg:unknown)=>{
        const target=this.wsocs.get(url);
        if(target?.readyState!=WebSocket.OPEN){
            throw new Error("websoc is not ready.");
        }
        target.send(JSON.stringify(msg));
    }
    subscribe=(url:string,subscriber:SubScriber|SubScriber[])=>{
        const target=this.subscribers.get(url);
        if(target){
            if(Array.isArray(subscriber)){
                subscriber.forEach((s)=>target.add(s));
            }else{
                target.add(subscriber);
            }
        }
    }
    unsubscribe=(url:string,subscriber:SubScriber|SubScriber[])=>{
        const target=this.subscribers.get(url);
        if(target){
            if(Array.isArray(subscriber)){
                subscriber.forEach((s)=>target.delete(s));
            }else{
                target.delete(subscriber);
            }
        }
    }
    close=()=>{
        this.wsocs.forEach((w,u)=>{
            console.log(`closing...${u}`);
            w.close();
        })
        this.subscribers.forEach((s)=>s.clear());
    }
}