import { Debug } from './Debug';
import { cc, fgui, kunpo } from './header';
import { SDKHelper } from './Helper/SDKHelper';
import { UIPackageRegister } from './UIPackageRegister';
const { ccclass, property, menu } = cc._decorator;
@ccclass("GameEntry")
@menu("kunpo/GameEntry")
export class GameEntry extends kunpo.CocosEntry {
    @property(cc.Node)
    private root: cc.Node = null;
    @property(cc.Asset)
    private manifest: cc.Asset = null;

    public getConfig(): kunpo.FrameConfig {
        return {
            debug: false
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
        UIPackageRegister.Register();
        SDKHelper.manifestUrl = this.manifest.nativeUrl;
        this.loadBaseResources();
    }

    /** 1. 加载基础资源 */
    private loadBaseResources(): void {
        let paths: kunpo.IAssetConfig[] = [
            { path: "ui/manual", type: cc.Asset }, // 手动加载UI基础资源
        ];
        let loader = new kunpo.AssetLoader("load");
        loader.start({
            configs: paths,
            complete: () => {
                fgui.UIPackage.addPackage("ui/manual/Basics");
                this.loadResources();
            },
            fail: (msg: string, err: Error) => {

            },
            progress: (percent: number) => {

            }
        });
    }

    /** 2. 加载剩余资源 */
    private loadResources(): void {
        let paths: kunpo.IAssetConfig[] = [
            { path: "prefab", type: cc.Prefab },
            { path: "config/buffer", type: cc.BufferAsset },
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
        kunpo.GlobalEvent.add("event::111", () => {
            kunpo.log("接收到事件");
        }, this);

        kunpo.WindowManager.showWindow("HomeWindow", "这是一个测试窗口").then(() => {
            kunpo.log("窗口显示成功");
            this.root.active = false;
        });
    }
}