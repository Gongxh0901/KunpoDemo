import { Debug } from './Debug';
import { cc, fgui, kunpo } from './header';
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

                if (kunpo.Platform.isNativeMobile) {
                    kunpo.HotUpdateManager.getInstance().init(this.manifest, KunpoSDK.SDKHelper.getInstance().getVersionCode());
                    this.checkHotUpdate();
                } else {
                    this.loadResources();
                }
            },
            fail: (msg: string, err: Error) => {

            },
            progress: (percent: number) => {

            }
        });
    }

    /** 2. 检查热更新 */
    private checkHotUpdate(): void {
        kunpo.HotUpdateManager.getInstance().checkUpdate({
            succeed: (need: boolean, size: number) => {
                if (need) {
                    kunpo.WindowManager.showWindowIm("AlertWindow", {
                        title: "提示",
                        content: `发现热更新 需更新大小:${Math.floor(size / 1024 * 1000) * 0.001}MB`,
                        okTitle: "更新",
                        complete: () => {
                            this.startHotUpdate();
                        },
                    });
                } else {
                    this.loadResources();
                }
            },
            fail: (code: number, message: string) => {
                kunpo.log("检查热更新失败", code, message);
                kunpo.WindowManager.showWindowIm("AlertWindow", {
                    title: "提示",
                    content: `检查热更新失败 code:${code} message:${message}`,
                    okTitle: "重试",
                    complete: () => {
                        this.checkHotUpdate();
                    },
                });
            }
        });
    }

    /** 3. 开始热更新 */
    private startHotUpdate(): void {
        kunpo.HotUpdateManager.getInstance().startUpdate({
            progress: (kb: number, total: number) => {
                kunpo.log("热更新进度", kb, total);
            },
            fail: (code: number, message: string) => {
                kunpo.log("热更新失败 询问是否重试", code, message);
                kunpo.WindowManager.showWindowIm("AlertWindow", {
                    title: "提示",
                    content: `热更新失败 询问是否重试 code:${code} message:${message}`,
                    okTitle: "重试",
                    complete: () => {
                        kunpo.HotUpdateManager.getInstance().retryUpdate();
                    },
                });
            },
            error: (code: number, message: string) => {
                kunpo.WindowManager.showWindowIm("AlertWindow", {
                    title: "提示",
                    content: `热更新出现错误, 重启游戏试试 code:${code} message:${message}`,
                    okTitle: "重启",
                    complete: () => {
                        cc.game.restart();
                    },
                });
            }
        });
    }
    /** 4. 加载剩余资源 */
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