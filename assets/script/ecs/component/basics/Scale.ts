/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Scale", { describe: "缩放组件" })
export class Scale extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 1, displayName: "缩放" })
    public scale: number = 1;

    public reset(): void {
        this.scale = 1;
    }
}