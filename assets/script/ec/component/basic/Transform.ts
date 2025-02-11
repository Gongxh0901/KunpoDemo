import { cc, kunpo } from "../../../header";
import { ComponentType } from "../../ComponentTypes";

const { ecclass, ecprop } = kunpo._ecdecorator;

@ecclass("Transform", ComponentType.Transform, { describe: "位置组件" })
export class Transform extends kunpo.Component {
    private _position: cc.Vec2 = cc.v2(0, 0);
    private _direction: cc.Vec2 = cc.v2(0, 0);
    protected onAdd(): void {
        this.needUpdate = false;
    }

    protected onEnter(): void {
    }

    protected onRemove(): void {
        this._position.x = 0;
        this._position.y = 0;
        this._direction.x = 0;
        this._direction.y = 0;
    }

    public setPosition(x: number | cc.Vec2, y?: number): void {
        if (typeof x === "object") {
            this._position.x = x.x || 0;
            this._position.y = x.y || 0;
        } else {
            this._position.x = x || 0;
            this._position.y = y || 0;
        }
    }

    public setDirection(x: number | cc.Vec2, y?: number): void {
        if (typeof x === "object") {
            if (this._direction.x == (x.x || 0) && this._direction.y == (x.y || 0)) {
                return;
            }
            this._direction.x = x.x || 0;
            this._direction.y = x.y || 0;
        } else {
            if (this._direction.x == (x || 0) && this._direction.y == (y || 0)) {
                return
            }
            this._direction.x = x || 0;
            this._direction.y = y || 0;
        }
    }

    public getPosition(): cc.Vec2 {
        return this._position;
    }

    public getDirection(): cc.Vec2 {
        return this._direction;
    }
}