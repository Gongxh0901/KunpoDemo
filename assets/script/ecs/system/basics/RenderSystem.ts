/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 
 */
import { ecs } from "../../../header";
import { Position } from "../../component/basics/Position";
import { Render } from "../../component/basics/Render";
import { Scale } from "../../component/basics/Scale";

const { ecsystem, ecsprop } = ecs._ecsdecorator;

@ecsystem("RenderSystem", { describe: "渲染系统" })
export class RenderSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Position, Render).optionalOf(Scale);
    }

    public update(dt: number): void {
        const query = this.query;
        const positions = query.components(Position);
        const renders = query.components(Render);
        const scales = query.components(Scale);

        let len = positions.length;
        for (let i = 0; i < len; i++) {
            const render = renders[i];
            const position = positions[i];
            const scale = scales[i];

            render.node.setPosition(position.x, position.y);
            if (scale) {
                render.node.setScale(scale.scale, scale.scale);
            }
        }
    }
}