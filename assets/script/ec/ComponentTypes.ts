/**
 * @Author: gongxh
 * @Date: 2025-01-23
 * @Description: 组件枚举
 */

import { cc } from "../header";

/** 数据组件类型 */
enum DataComponentType {
    Health,
    Transform,
    RootNode,
    LimitMove,
    /** 渲染组件 (多个) */
    Render,
}

/** 逻辑组件类型 (组件更新数据从上到下) */
export enum SystemComponentType {
    Move = 100000,
    ScreenRebound,

    /** 位置更新系统 */
    PositionUpdateSystem = 120000,
}

export const ComponentType = {
    ...DataComponentType,
    ...SystemComponentType
};
export type ComponentType = DataComponentType | SystemComponentType;

/** 自定义组件更新顺序列表 */
export const componentUpdateOrderList = cc.Enum.getList(cc.Enum(SystemComponentType)).map(item => item.value).sort((a, b) => a - b);