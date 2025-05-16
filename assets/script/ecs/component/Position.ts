/**
 * @Author: Gongxh
 * @Date: 2025-05-13
 * @Description: 
 */
import { ecs } from "../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Position", { describe: "位置组件" })
export class Position extends ecs.Component {
    public reset(): void {

    }
}

@ecsclass("Move", { describe: "移动组件" })
export class Move extends ecs.Component {
    public reset(): void {

    }
}

@ecsclass("Root", { describe: "节点组件" })
export class Root extends ecs.Component {
    public reset(): void {

    }
}