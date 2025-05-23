/**
 * @Author: Gongxh
 * @Date: 2025-05-23
 * @Description: 用来标记实体的类型
 */
import { ccc, ecs } from "../../../header";
import { EntityType } from "../header/EntityType";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Tag", { describe: "实体类型组件" })
export class Tag extends ecs.Component {
    // 多标签
    // @ecsprop({
    //     type: "array", format: {
    //         type: "enum", format: ccc.Enum(EntityType), defaultValue: EntityType.Enemy
    //     }
    // })
    // private tags: EntityType[] = [];

    @ecsprop({ type: "enum", format: ccc.Enum(EntityType), defaultValue: EntityType.Enemy, displayName: "实体类型" })
    public tag: EntityType = EntityType.Enemy;

    /** 获取标记掩码 */
    public getMask(): number {
        return 1 << this.tag;
    }

    public reset(): void {
        this.tag = EntityType.Enemy;
    }
}
