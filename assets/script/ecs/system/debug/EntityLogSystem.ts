/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 
 */
import { ecs } from "../../../header";
const { ecsystem, ecsprop } = ecs._ecsdecorator;

@ecsystem("EntityLogSystem", { describe: "实体日志系统" })
export class EntityLogSystem extends ecs.System {
    protected defineQuery(): ecs.IQueryData {
        return {};
    }

    public update(dt: number): void {
        console.log("实体数量:", this.world.entityPool.size);
    }
}