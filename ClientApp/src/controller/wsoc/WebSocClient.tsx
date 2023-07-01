import ReconnectingWebSocket from "reconnecting-websocket";

type SubScriber<T=unknown>=(message:T)=>void|(()=>void)
type WebSocClientConf={
    urls:string[]
}
export class WebSocClient{
    private readonly conf:WebSocClientConf;
    private readonly subscribers=new Map<string,Set<SubScriber>>()
    private readonly wsocs=new Map<string,ReconnectingWebSocket>();
    constructor(config:WebSocClientConf){
        this.conf=config;
    }
}