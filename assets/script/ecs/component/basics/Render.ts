/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 渲染组件
 */
import { ccc, ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

enum RenderType {
    Sprite = 1,
    Prefab = 2,
}

@ecsclass("Render", { describe: "渲染组件" })
export class Render extends ecs.Component {
    public node: ccc.Node = null;

    // @ecsprop({ type: "enum", format: ccc.Enum(RenderType), defaultValue: RenderType.Sprite, displayName: "资源类型" })
    // renderType: RenderType = RenderType.Sprite;

    // @ecsprop({ type: "string", displayName: "资源", tips: "拖拽相应的资源到输入框中" })
    // uuid: string = "";

    public reset(): void {
        this.node.destroy();
        this.node = null;
    }
}