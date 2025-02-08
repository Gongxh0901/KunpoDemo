/**
 * @Author: Gongxh
 * @Date: 2024-12-28
 * @Description: 
 */

export interface INetResponse {
    responseStatus: number;
    packet: any;
}

export interface IServerInfo {
    /** 名称 */
    name: string,
    /** http地址 */
    url: string,
    /** 应用id */
    appid: string,
    /** 密钥 */
    secret: string,
}

export const ServerConfig: IServerInfo = {
    name: "dev-gblnn",
    url: "https://dev-gblnn.lanfeitech.com",
    appid: "qEAb2ZhK",
    secret: "e7b439c886b4ce15fb809b14d69ed0e2",
}