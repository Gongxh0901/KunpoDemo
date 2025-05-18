/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 
 */
import { ecs } from "../../header";
import { LifeTime } from "../component/LifeTime";
const { ecsystem, ecsprop } = ecs._ecsdecorator;

@ecsystem("LifeTimeSystem", { describe: "生命周期系统" })
export class LifeTimeSystem extends ecs.System {
    protected defineQuery(): ecs.IQueryData {
        return {
            includes: [LifeTime],
        }
    }

    public update(dt: number): void {
        const query = this.query;

        const entities = query.entities();
        const lifeTimes = query.components(LifeTime);

        let len = entities.length;
        for (let i = 0; i < len; i++) {
            const lifeTime = lifeTimes[i];
            const entity = entities[i];

            lifeTime.lifeTime -= dt;
            if (lifeTime.lifeTime <= 0) {
                this.world.removeEntity(entity);
            }
        }
    }
}