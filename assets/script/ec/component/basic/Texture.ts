/**
 * @Author: Gongxh
 * @Date: 2025-02-10
 * @Description: 纹理组件
 */
import { cc, kunpo } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
import { RootNode } from "./RootNode";
const { ecclass, ecprop } = kunpo._ecdecorator;

@ecclass("RenderTexture", ComponentType.Render, { describe: "渲染组件" })
export class RenderTexture extends kunpo.Component {
    @ecprop({ type: "spriteframe", defaultValue: "", displayName: "图片" })
    private uuid: string = "";

    private _node: cc.Node = null;

    private _rootnode: RootNode = null;
    protected onAdd(): void {
        this.needUpdate = false;
    }

    protected onEnter(): void {
        this._rootnode = this.getComponent(ComponentType.RootNode);

        let node = new cc.Node();
        this._rootnode.node.addChild(node);
        this._node = node;

        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = kunpo.AssetPool.getByUUID<cc.SpriteFrame>(this.uuid);
    }

    protected onRemove(): void {
        // 组件删除时 把node回收  自行实现
    }
}