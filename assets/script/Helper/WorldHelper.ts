/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 这是一个单世界的例子
 */
import { LifeTimeSystem } from "../ecs/system/basics/LifeTimeSystem";
import { MoveSystem } from "../ecs/system/basics/MoveSystem";
import { RenderCreate } from "../ecs/system/basics/RenderCreate";
import { RenderSystem } from "../ecs/system/basics/RenderSystem";
import { EntityLogSystem } from "../ecs/system/debug/EntityLogSystem";
import { ccc, ecs } from "../header";

export class WorldHelper {
    private static _world: ecs.World;
    private static _node: ccc.Node;
    private static _singleton: ecs.Entity;

    public static get world(): ecs.World {
        return this._world;
    }

    public static get node(): ccc.Node {
        return this._node;
    }

    public static set node(node: ccc.Node) {
        this._node = node;
    }

    /** 单例实体 */
    private static get singleton(): ecs.Entity {
        if (!this._singleton) {
            this._singleton = this._world.createEmptyEntity();
        }
        return this._singleton;
    }

    /** 只能注册一次 */
    public static register(): void {
        if (this._world) {
            return;
        }
        let world = new ecs.World("world", 1 << 13);

        let defGroup = new ecs.SystemGroup("default");
        defGroup
            .addSystem(new RenderCreate())
            .addSystem(new MoveSystem())
            .addSystem(new RenderSystem())
            .addSystem(new LifeTimeSystem())
            ;

        let debugGroup = new ecs.SystemGroup("debug", 30);
        debugGroup.addSystem(new EntityLogSystem());

        world.addSystem(defGroup);
        world.addSystem(debugGroup);

        world.initialize();
        this._world = world;
    }

    /** 添加单例组件 */
    public static addSingleton<T extends ecs.Component>(component: ecs.ComponentType<T>): T {
        return this._world.addComponent(this.singleton, component);
    }

    /** 移除单例组件 */
    public static removeSingleton<T extends ecs.Component>(component: ecs.ComponentType<T>): void {
        this._world.removeComponent(this.singleton, component);
    }

    /** 获取单例组件 */
    public static getSingleton<T extends ecs.Component>(component: ecs.ComponentType<T>): T {
        return this._world.getComponent(this.singleton, component);
    }

    public static clear(): void {
        this._world.clear();
        this._singleton = null;
    }
}