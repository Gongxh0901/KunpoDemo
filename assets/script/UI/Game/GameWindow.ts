/**
 * @Author: Gongxh
 * @Date: 2025-01-16
 * @Description: 战斗界面
 */

import { ECManager, log } from "kunpocc";
import { SystemComponentType } from "../../ec/ComponentTypes";
import { cc, fgui, kunpo } from "../../header";
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
        let node = new cc.Node();
        this.container.node.addChild(node);

        // let sprite = node.addComponent(cc.Sprite);
        // sprite.spriteFrame = kunpo.AssetPool.get<cc.SpriteFrame>("icon/icon/spriteFrame");

        let list = cc.Enum.getList(SystemComponentType);
        // 取出list中每一项的value
        let values = list.map(item => item.value);
        log("需要更新的组件", values);
        ECManager.createECWorld("world", node, values, 100, 10);
        ECManager.createEntity("world", "entity1");
    }

    protected onClose() {
        ECManager.destroyECWorld("world");
    }

    @uiclick
    private onBack(): void {
        kunpo.WindowManager.showWindow("HomeWindow");
    }

    @uiclick
    private onCreateEntity(): void {
        ECManager.createEntity("world", "entity1");
    }

    protected onUpdate(dt: number): void {
        ECManager.getECWorld("world").update(dt);
    }
}
