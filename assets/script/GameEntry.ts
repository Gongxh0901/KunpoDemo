import { Debug } from './Debug';
import { ccc, ecs, fgui, kunpo } from './header';
import { SDKHelper } from './Helper/SDKHelper';
import { WorldHelper } from './Helper/WorldHelper';
import { UIPackageRegister } from './UIPackageRegister';
const { ccclass, property, menu } = ccc._decorator;
@ccclass("GameEntry")
@menu("kunpo/GameEntry")
export class GameEntry extends kunpo.CocosEntry {
    @property(ccc.Node)
    private root: ccc.Node = null;
    @property(ccc.Asset)
    private manifest: ccc.Asset = null;

    public getConfig(): kunpo.FrameConfig {
        return {
            debug: false
        };
    }

    onInit(): void {
        let deviceId = ccc.sys.localStorage.getItem('xBBres');
        if (!deviceId || deviceId === "") {
            deviceId = "browser@" + Date.now().toString();
            ccc.sys.localStorage.setItem('xBBres', deviceId);
        }
        kunpo.Platform.deviceId = deviceId;

        Debug.Register();
        UIPackageRegister.Register();
        SDKHelper.manifestUrl = this.manifest?.nativeUrl;
        this.loadBaseResources();
    }

    /** 1. 加载基础资源 */
    private loadBaseResources(): void {
        let paths: kunpo.IAssetConfig[] = [
            { path: "ui/manual", type: ccc.Asset }, // 手动加载UI基础资源
        ];
        let loader = new kunpo.AssetLoader("load");
        loader.start({
            configs: paths,
            complete: () => {
                fgui.UIPackage.addPackage("ui/manual/Basics");
                fgui.UIPackage.addPackage("ui/manual/Home");
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
            { path: "prefab", type: ccc.Prefab },
            { path: "config/buffer", type: ccc.BufferAsset },
            { path: "icon", type: ccc.SpriteFrame },
            // { path: "texture/6101/spriteFrame", type: ccc.SpriteFrame, isFile: true },
            // { path: "pet", type: ccc.SpriteFrame, bundle: "bundle_res" },
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

        ecs.Data.parse(this.ecConfig.json);
        WorldHelper.register();
        kunpo.WindowManager.showWindow("HomeWindow", "这是一个测试窗口").then(() => {
            kunpo.log("窗口显示成功");
            this.root.active = false;
        });
    }
}