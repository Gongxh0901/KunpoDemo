/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("ShapeBox", { describe: "矩形组件" })
export class ShapeBox extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0 })
    public width: number = 0;

    @ecsprop({ type: "float", defaultValue: 0 })
    public height: number = 0;

    @ecsprop({ type: "float", defaultValue: 0 })
    public x: number = 0;

    @ecsprop({ type: "float", defaultValue: 0 })
    public y: number = 0;

    public reset(): void {
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
    }
}