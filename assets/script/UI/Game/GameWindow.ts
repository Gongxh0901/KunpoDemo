/**
 * @Author: Gongxh
 * @Date: 2025-01-16
 * @Description: 战斗界面
 */

import { ECManager } from "kunpocc";
import { ComponentType } from "../../ec/ComponentTypes";
import { fgui, kunpo } from "../../header";
const { uiclass, uiprop, uiclick } = kunpo._uidecorator;

@uiclass("Window", "Game", "GameWindow")
export class GameWindow extends kunpo.Window {
    @uiprop container: fgui.GComponent;
    @uiprop btn_back: fgui.GButton;
    public onInit() {
        console.log("GameWindow onInit");
        this.adapterType = kunpo.AdapterType.Full;
        this.type = kunpo.WindowType.CloseAll;
        this.bgAlpha = 0;
    }

    protected onShow() {
        console.log("GameWindow onShow");
        ECManager.createECWorld("world", [ComponentType.Health], 100, 10);

        ECManager.createEntity("world", "entity1");
    }

    protected onClose() {
        ECManager.destroyECWorld("world");
    }

    @uiclick
    private onBack(): void {
        kunpo.WindowManager.showWindow("HomeWindow");
    }
}
