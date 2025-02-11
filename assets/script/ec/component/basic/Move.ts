/**
 * @Author: Gongxh
 * @Date: 2025-01-24
 * @Description: 移动组件
 */

import { kunpo } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
import { RootNode } from "./RootNode";
import { Transform } from "./Transform";
const { ecclass, ecprop } = kunpo._ecdecorator;

@ecclass("Move", ComponentType.Move, { describe: "移动组件" })
export class Move extends kunpo.Component {
    @ecprop({ type: "int", defaultValue: 0, displayName: "移动速度" })
    private speed: number = 0;

    private _rootnode: RootNode = null;
    private _transform: Transform = null;
    protected onAdd(): void {
        this.needUpdate = true;
    }

    protected onEnter(): void {
        this._rootnode = this.getComponent(ComponentType.RootNode);
        this._transform = this.getComponent(ComponentType.Transform);
    }

    protected onRemove(): void {

    }

    protected onUpdate(dt: number): void {

    }
}
