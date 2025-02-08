/**
 * @Author: Gongxh
 * @Date: 2025-01-24
 * @Description: 移动组件
 */

import { kunpo } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
const { ecclass, ecprop } = kunpo._ecdecorator;

@ecclass("Move", ComponentType.Move, { describe: "移动组件" })
export class Move extends kunpo.Component {
    public parse(data: any): void {

    }

    protected onEnter(): void {

    }

    protected onRemove(): void {

    }
}
