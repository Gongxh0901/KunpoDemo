/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Direction", { describe: "方向组件" })
export class Direction extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0 })
    public x: number = 0;

    @ecsprop({ type: "float", defaultValue: 0 })
    public y: number = 0;

    public reset(): void {
        this.x = 0;
        this.y = 0;
    }
}