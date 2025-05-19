/**
 * @Author: Gongxh
 * @Date: 2025-05-13
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Position", { describe: "位置组件" })
export class Position extends ecs.Component {
    @ecsprop({ type: "int", defaultValue: 0 })
    public x: number = 0;

    @ecsprop({ type: "int", defaultValue: 0 })
    public y: number = 0;

    public reset(): void {
        this.x = 0;
        this.y = 0;
    }
}