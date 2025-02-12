/**
 * @Author: Gongxh
 * @Date: 2025-01-16
 * @Description: 战斗界面
 */

import { ECManager } from "kunpocc";
import { componentUpdateOrderList } from "../../ec/ComponentTypes";
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
        /** 创建一个ec世界的节点 */
        let node = new cc.Node();
        this.container.node.addChild(node);

        /** 
         * 创建一个ec世界 
         * 参数1: 世界名称
         * 参数2: 世界节点
         * 参数3: 组件更新顺序列表
         * 参数4: 实体池的最大缓存数量，多余的不会被缓存，根据需要调整
         * 参数5: 预创建的实体数量，根据需要调整
         */
        kunpo.log("需要更新的组件", componentUpdateOrderList);
        ECManager.createECWorld("world", node, componentUpdateOrderList, 100, 10);
    }

    protected onClose() {
        /** 退出游戏时 销毁ec世界 */
        ECManager.destroyECWorld("world");
    }

    @uiclick
    private onBack(): void {
        kunpo.WindowManager.showWindow("HomeWindow");
    }

    @uiclick
    private onCreateEntity(): void {
        /** 创建一个实体 */
        ECManager.createEntity("world", "entity1");
    }

    protected onUpdate(dt: number): void {
        /** 更新ec世界 */
        ECManager.getECWorld("world").update(dt);
    }
}
