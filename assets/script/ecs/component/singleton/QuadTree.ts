/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 四叉树
 */

import { ecs, kunpo } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("QuadTree", { describe: "四叉树组件" })
export class QuadTree extends ecs.Component {
    public quadTree: kunpo.QuadTree;

    public reset(): void {
        this.quadTree.clear();
        this.quadTree = null;
    }
}