/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Health", { describe: "生命组件" })
export class Health extends ecs.Component {
    @ecsprop({ type: "int", defaultValue: 0 })
    public hp: number = 0;

    @ecsprop({ type: "int", defaultValue: 0 })
    public maxHp: number = 0;

    public reset(): void {
        this.hp = 0;
        this.maxHp = 0;
    }
}