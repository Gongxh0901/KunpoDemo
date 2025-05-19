/**
 * @Author: LQ
 * @Date: 2023-04-17
 * @Description: 
 */

import { ccc, kunpo } from "./header";

const tt = window['tt'];

export class Debug {
    public static Register(): void {
        this._registerSystemEvent();
    }

    private static _registerSystemEvent(): void {
        ccc.input.on(ccc.Input.EventType.KEY_DOWN, (event: ccc.EventKeyboard) => {
            if (event.keyCode == ccc.KeyCode.KEY_Q) {
                kunpo.WindowManager.showWindow("HomeWindow")
            } else if (event.keyCode == ccc.KeyCode.KEY_W) {
                kunpo.WindowManager.showWindow("HideAllWindow");
            } else if (event.keyCode == ccc.KeyCode.KEY_E) {
                kunpo.WindowManager.showWindow("HideOneWindow");
            } else if (event.keyCode == ccc.KeyCode.KEY_R) {
                kunpo.WindowManager.showWindow("CloseAllWindow");
            } else if (event.keyCode == ccc.KeyCode.KEY_T) {
                kunpo.WindowManager.showWindow("CloseOneWindow");
            } else if (event.keyCode == ccc.KeyCode.KEY_Y) {
                kunpo.WindowManager.showWindow("GameWindow");
            } else if (event.keyCode == ccc.KeyCode.KEY_U) {

            } else if (event.keyCode == ccc.KeyCode.KEY_A) {
                kunpo.WindowManager.showWindow("PopWindowHeader1");
                // new NetAuth().start();
            } else if (event.keyCode == ccc.KeyCode.KEY_S) {
                kunpo.WindowManager.showWindow("PopWindowHeader2");
            } else if (event.keyCode == ccc.KeyCode.KEY_D) {
                kunpo.WindowManager.showWindow("PopWindow");
            } else if (event.keyCode == ccc.KeyCode.KEY_F) {

            } else if (event.keyCode == ccc.KeyCode.KEY_G) {

            } else if (event.keyCode == ccc.KeyCode.KEY_H) {

            } else if (event.keyCode == ccc.KeyCode.KEY_J) {

            }
        });
    }

    /** 跳转侧边栏 */
    public navigateToScene(): void {
        if (tt['navigateToScene']) {
            tt['navigateToScene']({
                scene: "sidebar",
                success: (res: { errMsg: string }) => {
                    console.log(`侧边栏跳转成功:${res.errMsg}`);
                },
                fail: (res: { errMsg: string, errNo: number }) => {
                    console.log(`侧边栏跳转失败 code:${res.errNo}; msg:${res.errMsg}`);
                },
            });
        }
    }
}