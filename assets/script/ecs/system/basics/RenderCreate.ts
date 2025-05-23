/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 
 */
import { ccc, ecs, kunpo } from "../../../header";
import { WorldHelper } from "../../../Helper/WorldHelper";
import { Prefab, SpriteFrame } from "../../component/basics/Asset";
import { Position } from "../../component/basics/Position";
import { Render } from "../../component/basics/Render";
const { ecsystem, ecsprop } = ecs._ecsdecorator;

@ecsystem("RenderCreate", { describe: "初始化渲染系统" })
export class RenderCreate extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Position).anyOf(Prefab, SpriteFrame).excludeOf(Render);
    }

    public update(dt: number): void {
        const query = this.query;

        const entities = query.entities();
        const positions = query.components(Position);

        const prefabs = query.components(Prefab);
        const spriteFrames = query.components(SpriteFrame);

        let len = positions.length;
        for (let i = 0; i < len; i++) {
            const entity = entities[i];

            const position = positions[i];
            const prefab = prefabs[i];
            const spriteFrame = spriteFrames[i];

            if (prefab) {
                let asset = kunpo.AssetPool.getByUUID<ccc.Prefab>(prefab.uuid);
                const node = ccc.instantiate(asset);
                node.setPosition(position.x, position.y);
                WorldHelper.node.addChild(node);
                node.layer = 1 << 1;

                let render = this.world.addComponent(entity, Render);
                render.node = node;

                // 删除组件
                this.world.removeComponent(entity, Prefab);
            } else if (spriteFrame) {
                let node = new ccc.Node(`${entity}`);
                let sprite = node.addComponent(ccc.Sprite);
                sprite.spriteFrame = kunpo.AssetPool.getByUUID<ccc.SpriteFrame>(spriteFrame.uuid);
                node.setPosition(position.x, position.y);
                WorldHelper.node.addChild(node);
                node.layer = 1 << 1;

                let render = this.world.addComponent(entity, Render);
                render.node = node;

                this.world.removeComponent(entity, SpriteFrame);
            }
        }
    }
}