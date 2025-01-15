/**
 * @Author: Gongxh
 * @Date: 2024-05-20
 * @Description: 
 */
import { kunpo } from "../header";
import { ServerConfig } from "./header";

export class NetHelper {
    public static get url(): string { return ServerConfig.url };
    public static get appid(): string { return ServerConfig.appid };
    public static get secret(): string { return ServerConfig.secret };

    public static send(url: string, data: any, netEvent: kunpo.IHttpEvent) {
        netEvent.data = new Date().getTime();
        let sendData = JSON.stringify(data);
        kunpo.log(`http request\n name:${netEvent.name}\n   url=${this.url + url}\n   data=${sendData}`);
        kunpo.HttpManager.post(this.url + url, sendData, "json", netEvent, null, 5);
    }

    private static formatHeaders(time: number, data: any): any[] {
        return ["content-type", "application/json", "authorization", ""];
    }
}