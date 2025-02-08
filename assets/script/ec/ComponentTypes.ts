/**
 * @Author: gongxh
 * @Date: 2025-01-23
 * @Description: 组件枚举
 */

import { cc } from "../header";

/** 数据组件类型 */
enum DataComponentType {
    Health,
}

/** 逻辑组件类型 (组件更新数据从上到下) */
enum SystemComponentType {
    Move = 100001,
}

export const ComponentType = {
    ...DataComponentType,
    ...SystemComponentType
};
export type ComponentType = DataComponentType | SystemComponentType;

/** 自定义组件更新顺序列表 */
export const componentUpdateOrderList = [];
let list = cc.Enum["getList"](cc.Enum(SystemComponentType));
for (const { name } of list) {
    componentUpdateOrderList.push(name);
}