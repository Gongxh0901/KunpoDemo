/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Scale", { describe: "缩放组件" })
export class Scale extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 1, displayName: "X轴缩放" })
    public scaleX: number = 1;

    @ecsprop({ type: "float", defaultValue: 1, displayName: "Y轴缩放" })
    public scaleY: number = 1;

    public reset(): void {
        this.scaleX = 1;
        this.scaleY = 1;
    }
}