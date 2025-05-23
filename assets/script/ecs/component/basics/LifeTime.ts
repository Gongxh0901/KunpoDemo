/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("LifeTime", { describe: "生存时间组件" })
export class LifeTime extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0 })
    public lifeTime: number = 0;

    public reset(): void {
        this.lifeTime = 0;
    }
}