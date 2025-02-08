/**
 * @Author: Gongxh
 * @Date: 2024-12-11
 * @Description: 
 */

import { fgui, kunpo } from "../header";
const { uiclass, uiprop, uiclick } = kunpo._uidecorator;

@uiclass("Window", "Home", "HomeWindow")
export class HomeWindow extends kunpo.Window {
    @uiprop private btn_header1: fgui.GButton;
    @uiprop private btn_header2: fgui.GButton;
    @uiprop private btn_empty: fgui.GButton;
    @uiprop private btn_closeone: fgui.GButton;
    @uiprop private btn_closeall: fgui.GButton;
    @uiprop private btn_hideone: fgui.GButton;
    @uiprop private btn_hideall: fgui.GButton;

    protected onInit(): void {
        this.adapterType = kunpo.AdapterType.Bang;
        this.type = kunpo.WindowType.Normal;
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

    public getHeaderInfo(): kunpo.WindowHeaderInfo {
        return kunpo.WindowHeaderInfo.create("WindowHeader", "aaa");
    }
}
