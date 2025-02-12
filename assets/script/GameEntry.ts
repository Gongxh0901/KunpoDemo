import { Debug } from './Debug';
import { cc, fgui, kunpo } from './header';
const { ccclass, property, menu } = cc._decorator;
@ccclass("GameEntry")
@menu("kunpo/GameEntry")
export class GameEntry extends kunpo.CocosEntry {
    @property(cc.Node)
    private root: cc.Node = null;

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
        let paths: kunpo.IAssetConfig[] = [
            { path: "ui", type: cc.Asset },
            { path: "prefab", type: cc.Prefab },
            // { path: "icon", type: cc.SpriteFrame },
            // { path: "texture/6101/spriteFrame", type: cc.SpriteFrame, isFile: true },
            // { path: "pet", type: cc.SpriteFrame, bundle: "bundle_res" },
        ];
        let loader = new kunpo.AssetLoader("load");
        loader.start({
            configs: paths,
            complete: () => {
                this.loadComplete();
            },
            fail: (msg: string, err: Error) => {

            },
            progress: (percent: number) => {

            }
        });
    }


    private loadComplete(): void {
        fgui.UIPackage.addPackage("ui/Basics");
        fgui.UIPackage.addPackage("ui/Home");
        fgui.UIPackage.addPackage("ui/Game");

        this.root.active = false;
        kunpo.WindowManager.showWindow("HomeWindow", "这是一个测试窗口");

        kunpo.GlobalEvent.add("event::111", () => {
            kunpo.log("接收到事件");
        }, this);

        kunpo.AssetPool.releaseDir("pet", "bundle_res", cc.SpriteFrame);
    }
}