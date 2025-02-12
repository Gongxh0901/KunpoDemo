/**
 * @Author: Gongxh
 * @Date: 2023-04-26
 * @Description: 位置更新系统
 */
import { kunpo } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
import { RootNode } from "./RootNode";
import { Transform } from "./Transform";
const { ecclass, ecprop } = kunpo._ecdecorator;

@ecclass("PositionUpdateSystem", ComponentType.PositionUpdateSystem, { describe: "位置更新系统" })
export class PositionUpdateSystem extends kunpo.Component {
    private _transform: Transform = null;
    private _rootnode: RootNode = null;

    protected onAdd(): void {
        this.needUpdate = true;
    }

    protected onEnter(): void {
        this._transform = this.getComponent(ComponentType.Transform);
        this._rootnode = this.getComponent(ComponentType.RootNode);
        this._rootnode.node.setPosition(this._transform.getPosition());
    }

    protected onRemove(): void {
        this._transform = null;
        this._rootnode = null;
    }

    protected onUpdate(): void {
        if (!this._transform || !this._rootnode) {
            return;
        }
        this._rootnode.node.setPosition(this._transform.getPosition());
    }
}