/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 
 */
import { ecs } from "../../header";
import { Direction } from "../component/Direction";
import { Position } from "../component/Position";
import { Speed } from "../component/Speed";
const { ecsystem, ecsprop } = ecs._ecsdecorator;

@ecsystem("MoveSystem", { describe: "移动系统" })
export class MoveSystem extends ecs.System {
    protected defineQuery(): ecs.IQueryData {
        return {
            includes: [Position, Speed, Direction],
        }
    }

    public update(dt: number): void {
        const query = this.query;

        const positions = query.components(Position);
        const speeds = query.components(Speed);
        const directions = query.components(Direction);

        let len = positions.length;
        for (let i = 0; i < len; i++) {
            const position = positions[i];
            const speed = speeds[i];
            const direction = directions[i];

            position.x += direction.x * speed.speed * dt;
            position.y += direction.y * speed.speed * dt;
        }
    }
}