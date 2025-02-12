import { kunpo } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
import { Transform } from "./Transform";

const { ecclass, ecprop } = kunpo._ecdecorator;

export enum LimitType {
    None,
    LimitX,
    LimitY,
    LimitAll,
}

@ecclass("LimitMove", ComponentType.LimitMove, { describe: "限制移动组件" })
export class LimitMove extends kunpo.Component {
    @ecprop({ type: "int", displayName: "半径", defaultValue: 30 })
    radius: number = 30;

    private _limitType: LimitType = LimitType.None;
    private _transform: Transform = null;
    protected onAdd(): void {
        this.needUpdate = false;
    }

    protected onEnter(): void {
        this.radius = 30;
        this._limitType = LimitType.None;
        this._transform = this.getComponent(ComponentType.Transform);
    }

    protected onRemove(): void {
        this._transform = null;
        this._limitType = LimitType.None;
        this.radius = 30;
    }

    public get limitType(): LimitType {
        return this._limitType;
    }

    public limitAdjust(moveX: number, moveY: number): { newX: number, newY: number } {
        let pos = this._transform.getPosition();
        let newX = pos.x + moveX;
        let newY = pos.y + moveY;

        let width = kunpo.Screen.ScreenWidth * 0.5;
        let height = kunpo.Screen.ScreenHeight * 0.5;

        this._limitType = LimitType.None;

        let isLimitX = false;
        let isLimitY = false;
        if (newX - this.radius < -width) {
            newX = -width + this.radius;
            isLimitX = true;
        } else if (newX + this.radius > width) {
            newX = width - this.radius;
            isLimitX = true;
        }

        if (newY - this.radius < -height) {
            newY = -height + this.radius;
            isLimitY = true;
        } else if (newY + this.radius > height) {
            newY = height - this.radius;
            isLimitY = true;
        }

        if (isLimitX && isLimitY) {
            this._limitType = LimitType.LimitAll;
        } else if (isLimitX) {
            this._limitType = LimitType.LimitX;
        } else if (isLimitY) {
            this._limitType = LimitType.LimitY;
        } else {
            this._limitType = LimitType.None;
        }
        return { newX, newY };
    }
}