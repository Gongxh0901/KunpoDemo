/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("ShapeCircle", { describe: "圆形组件" })
export class ShapeCircle extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0 })
    public radius: number = 0;

    public reset(): void {
        this.radius = 0;
    }
}