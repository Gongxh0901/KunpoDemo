/**
 * @Author: Gongxh
 * @Date: 2024-12-11
 * @Description: 
 */

import { cc, fgui, kunpo } from "../header";
const { uiclass, uiprop, uiclick } = kunpo._uidecorator;

@uiclass("Window", "Home", "HomeWindow")
export class HomeWindow extends kunpo.Window {
    @uiprop private btn_header1: fgui.GButton;
    @uiprop private btn_header2: fgui.GButton;

    protected onInit(): void {
        this.adapterType = kunpo.AdapterType.Bang;
        this.type = kunpo.WindowType.CloseAll;
    }

    protected onShow(userdata?: any): void {
        kunpo.log("HomeWindow onShow:", userdata);
    }

    protected onHide(): void {
        kunpo.log("HomeWindow onHide");
    }

    protected onCover(): void {
        kunpo.log("HomeWindow onCover");
    }

    protected onRecover(): void {
        kunpo.log("HomeWindow onRecover");
    }

    protected onShowFromHide(): void {
        kunpo.log("HomeWindow onShowFromHide");
    }

    protected onEmptyAreaClick(): void {
        kunpo.log("HomeWindow 点击空白区域");
    }

    protected onClose(): void {
        kunpo.log("HomeWindow onClose");
    }

    @uiclick
    private onClickBtnHeader1(): void {
        kunpo.WindowManager.showWindow("PopWindowHeader1");
    }

    @uiclick
    private onClickBtnHeader2(): void {
        kunpo.WindowManager.showWindow("PopWindowHeader2");
    }

    @uiclick
    private onClickBtnEmpty(): void {
        kunpo.WindowManager.showWindow("PopWindow");
    }

    @uiclick
    private onClickBtnCloseOne(): void {
        kunpo.WindowManager.showWindow("CloseOneWindow");
    }

    @uiclick
    private onClickBtnCloseAll(): void {
        kunpo.WindowManager.showWindow("CloseAllWindow");
    }

    @uiclick
    private onClickBtnHideOne(): void {
        kunpo.WindowManager.showWindow("HideOneWindow");
    }

    @uiclick
    private onClickBtnHideAll(): void {
        kunpo.WindowManager.showWindow("HideAllWindow");
    }

    @uiclick
    private onSocketWindow(): void {
        kunpo.WindowManager.showWindow("SocketTestWindow");
    }

    @uiclick
    private onClickBtnGame(): void {
        // kunpo.log("获取版本号", KunpoSDK.SDKHelper.getInstance().getVersionCode());
        // kunpo.log("获取build号", KunpoSDK.SDKHelper.getInstance().getBuildCode());
        kunpo.WindowManager.showWindow("GameWindow");
    }

    @uiclick
    private onClickBtnCondition(): void {
        kunpo.WindowManager.showWindow("ConditionWindow");
    }


    @uiclick
    private onClickMiniGame(): void {
        if (kunpo.Platform.isWX || kunpo.Platform.isAlipay || kunpo.Platform.isBytedance) {
            kunpo.WindowManager.showWindow("MiniGameWindow");
        } else {
            kunpo.WindowManager.showWindowIm("ToastWindow", { text: "当前平台不是 微信/阿里/抖音小游戏" })
        }
    }

    @uiclick
    private onClickBtnHotUpdate(): void {
        if (kunpo.Platform.isNativeMobile) {
            kunpo.WindowManager.showWindow("HotUpdateWindow");
        } else {
            kunpo.WindowManager.showWindowIm("ToastWindow", { text: "只有原生平台才支持热更新" })
        }
    }

    @uiclick
    private onClickLoadBuffer(): void {
        let paths: kunpo.IAssetConfig[] = [
            { path: "config/buffer", type: cc.BufferAsset },
        ];
        let loader = new kunpo.AssetLoader("load");
        loader.start({
            configs: paths,
            complete: () => {
                kunpo.log("加载成功");

                let basic = kunpo.AssetPool.get<cc.BufferAsset>("config/buffer/basic");
                kunpo.log("basic", JSON.stringify(kunpo.Binary.toJson(basic.buffer())));

                let dict = kunpo.AssetPool.get<cc.BufferAsset>("config/buffer/dict");
                kunpo.log("dict", JSON.stringify(kunpo.Binary.toJson(dict.buffer())));

                let listDict = kunpo.AssetPool.get<cc.BufferAsset>("config/buffer/list_dict");
                kunpo.log("list_dict", JSON.stringify(kunpo.Binary.toJson(listDict.buffer())));

                let aaa = {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5,
                };
                kunpo.log("aaa", JSON.stringify(kunpo.Binary.toJson(aaa)));
            },
            fail: (msg: string, err: Error) => {
                kunpo.log("加载失败", msg, err);
            },
            progress: (percent: number) => {

            }
        });
    }

    public getHeaderInfo(): kunpo.WindowHeaderInfo {
        return kunpo.WindowHeaderInfo.create("WindowHeader", "aaa");
    }
}
