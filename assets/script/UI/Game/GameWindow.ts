/**
 * @Author: Gongxh
 * @Date: 2025-01-16
 * @Description: 战斗界面
 */

import { WorldHelper } from "../../Helper/WorldHelper";
import { ccc, fgui, kunpo } from "../../header";
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
        // 创建
        this.initWorld();
    }

    protected onClose() {
        WorldHelper.clear();
    }

    @uiclick
    private onBack(): void {
        kunpo.WindowManager.showWindow("HomeWindow");
    }

    @uiclick
    private onCreateEntity(): void {
        for (let i = 0; i < 5000; i++) {
            WorldHelper.world.createEntity("entity1");
        }
    }

    private initWorld(): void {
        let node = new ccc.Node("World");
        node.setPosition(0, 0);
        node.layer = 1 << 1;
        this.container.node.addChild(node);
        WorldHelper.node = node;

        // WorldHelper.addSingleton()
    }

    protected onUpdate(dt: number): void {
        WorldHelper.world.update(dt);
    }
}
