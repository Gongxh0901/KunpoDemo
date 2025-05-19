/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Speed", { describe: "速度组件" })
export class Speed extends ecs.Component {
    @ecsprop({ type: "int", defaultValue: 0 })
    public speed: number = 0;

    public reset(): void {
        this.speed = 0;
    }
}