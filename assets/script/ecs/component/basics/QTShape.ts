/**
 * @Author: Gongxh
 * @Date: 2025-05-23
 * @Description: 
 */
import { ecs, kunpo } from "../../../header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("QTShape", { describe: "四叉树形状组件" })
export class QTShape extends ecs.Component {
    public shape: kunpo.Shape;

    public reset(): void {
        this.shape = null;
    }
}