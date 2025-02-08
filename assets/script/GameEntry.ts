import { AssetLoader } from './AssetHelper';
import { Debug } from './Debug';
import { cc, fgui, kunpo } from './header';
const { ccclass, property, menu } = cc._decorator;
@ccclass("GameEntry")
@menu("kunpo/GameEntry")
export class GameEntry extends kunpo.CocosEntry {
    public getConfig(): kunpo.FrameConfig {
        return {
            debug: true
        };
    }

    onInit(): void {
        let deviceId = cc.sys.localStorage.getItem('xBBres');
        if (!deviceId || deviceId === "") {
            deviceId = "browser@" + Date.now().toString();
            cc.sys.localStorage.setItem('xBBres', deviceId);
        }
        kunpo.Platform.deviceId = deviceId;

        Debug.Register();
        this.loadResources();
    }

    private loadResources(): void {
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
        fgui.UIPackage.addPackage("ui/Game");
        kunpo.WindowManager.showWindow("HomeWindow", "这是一个测试窗口");

        kunpo.GlobalEvent.add("event::111", () => {
            kunpo.log("接收到事件");
        }, this);
    }
}