/**
 * @Author: Gongxh
 * @Date: 2025-03-22
 * @Description: 
 */

import { kunpo } from "../header";

class SDKHelper {
    public static getSystemInfo(): Promise<{ version: string, build: number }> {
        return new Promise((resolve, reject) => {
            KunpoSDK.SDKHelper.getInstance().getSystemInfo();
            kunpo.GlobalEvent.addOnce("calljs::getSystemInfo", (data: { version: string, build: number }) => {
                resolve(data);
            }, this);
        });
    }
}
