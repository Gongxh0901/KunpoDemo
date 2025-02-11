import { cc, kunpo } from "../../../header";
import { ComponentType } from "../../ComponentTypes";

const { ecclass, ecprop } = kunpo._ecdecorator;

@ecclass("RootNode", ComponentType.RootNode, { describe: "实体根节点组件" })
export class RootNode extends kunpo.Component {
    private _node: cc.Node = null;
    protected onAdd(): void {
        this.needUpdate = false;

        let rootnode = new cc.Node();
        kunpo.ECManager.getECWorldNode(this.entity.entityManager.name).addChild(rootnode);
        this._node = rootnode;
    }

    protected onEnter(): void {

    }

    protected onRemove(): void {
        this._node.destroy()
    }

    public get node(): cc.Node {
        return this._node;
    }
}