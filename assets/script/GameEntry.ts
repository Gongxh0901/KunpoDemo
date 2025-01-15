/**
 * @Author: Gongxh
 * @Date: 2025-01-15
 * @Description: 
 */

import { AssetLoader } from "./extension/AssetHelper";
import { cc, fgui, kunpo } from "./header";
const { ccclass, property, menu } = cc._decorator;

@ccclass('GameEntry')
@menu('kunpo/GameEntry')
export class GameEntry extends kunpo.CocosEntry {
    public getConfig(): kunpo.FrameConfig {
        return {
            debug: true
        };
    }

    public onInit(): void {
        kunpo.log("onInit");

        let paths = [
            { path: "ui", type: cc.Asset },
        ];
        let loader = new AssetLoader();
        loader.setLoadItems(paths);
        loader.setCallbacks(
            (percent: number) => {

            },
            () => {
                this.loadComplete();
            }
        );
        loader.start();
    }

    private loadComplete(): void {
        fgui.UIPackage.addPackage("ui/Basics");
        fgui.UIPackage.addPackage("ui/Home");
        kunpo.WindowManager.showWindow("HomeWindow", "这是一个测试窗口");

        kunpo.GlobalEvent.add("event::111", () => {
            kunpo.log("接收到事件");
        }, this);
    }
}
