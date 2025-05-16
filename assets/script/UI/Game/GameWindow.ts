/**
 * @Author: Gongxh
 * @Date: 2025-01-16
 * @Description: 战斗界面
 */

import { fgui, kunpo } from "../../header";
const { uiclass, uiprop, uiclick } = kunpo._uidecorator;

@uiclass("Window", "Game", "GameWindow")
export class GameWindow extends kunpo.Window {
    @uiprop container: fgui.GComponent;
    public onInit() {
        console.log("GameWindow onInit");
        this.adapterType = kunpo.AdapterType.Full;
        this.type = kunpo.WindowType.CloseAll;
        this.bgAlpha = 0;
    }

    protected onShow() {
        console.log("GameWindow onShow");
    }

    protected onClose() {

    }

    @uiclick
    private onBack(): void {
        kunpo.WindowManager.showWindow("HomeWindow");
    }

    @uiclick
    private onCreateEntity(): void {

    }

    protected onUpdate(dt: number): void {

    }
}
