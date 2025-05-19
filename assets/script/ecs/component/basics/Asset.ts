/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 渲染需要的资源配置
 */
import { ecs } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Prefab", { describe: "预制体组件" })
export class Prefab extends ecs.Component {
    @ecsprop({ type: "prefab", defaultValue: "", displayName: "预制体" })
    uuid: string = "";

    public reset(): void {
        this.uuid = "";
    }
}

@ecsclass("SpriteFrame", { describe: "精灵帧组件" })
export class SpriteFrame extends ecs.Component {
    @ecsprop({ type: "spriteframe", defaultValue: "", displayName: "资源" })
    uuid: string = "";

    public reset(): void {
        this.uuid = "";
    }
}
