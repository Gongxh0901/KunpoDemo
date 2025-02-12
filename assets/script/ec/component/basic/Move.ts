/**
 * @Author: Gongxh
 * @Date: 2025-01-24
 * @Description: 移动组件
 */

import { kunpo } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
import { LimitMove } from "./LimitMove";
import { Transform } from "./Transform";
const { ecclass, ecprop } = kunpo._ecdecorator;

@ecclass("Move", ComponentType.Move, { describe: "移动组件" })
export class Move extends kunpo.Component {
    @ecprop({ type: "int", defaultValue: 0, displayName: "移动速度" })
    private _speed: number = 0;

    private _transform: Transform = null;
    private _limitmove: LimitMove = null;
    protected onAdd(): void {
        this.needUpdate = true;
    }

    protected onEnter(): void {
        this._limitmove = this.getComponent(ComponentType.LimitMove);
        this._transform = this.getComponent(ComponentType.Transform);
    }

    protected onRemove(): void {

    }

    protected onUpdate(dt: number): void {
        let speed = this.speed;

        let moveDir = this._transform.getMoveDir();
        let moveX = moveDir.x * speed * dt;
        let moveY = moveDir.y * speed * dt;

        if (this._limitmove) {
            let { newX, newY } = this._limitmove.limitAdjust(moveX, moveY);
            this._transform.setPosition(newX, newY);
        } else {
            let cur_pos = this._transform.getPosition();
            this._transform.setPosition(cur_pos.x + moveX, cur_pos.y + moveY);
        }
    }

    public get speed(): number {
        return this._speed;
    }

    public set speed(value: number) {
        this._speed = value;
    }
}
