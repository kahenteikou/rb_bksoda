import ReconnectingWebSocket from "reconnecting-websocket";

type SubScriber<T=unknown>=(message:T)=>void|(()=>void)
type WebSocClientConf={
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
}