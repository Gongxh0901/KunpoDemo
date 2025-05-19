/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 这是一个单世界的例子
 */
import { InitRenderSystem } from "../ecs/system/basics/InitRenderSystem";
import { MoveSystem } from "../ecs/system/basics/MoveSystem";
import { RenderSystem } from "../ecs/system/basics/RenderSystem";
import { EntityLogSystem } from "../ecs/system/debug/EntityLogSystem";
import { ccc, ecs } from "../header";

export class WorldHelper {
    private static _world: ecs.World;
    private static _node: ccc.Node;
    private static _singleton: ecs.Entity;

    /**
     * 只能注册一次
     */
    public static register(): void {
        if (this._world) {
            return;
        }
        let world = new ecs.World("战斗世界");

        let defGroup = new ecs.SystemGroup("默认组");
        defGroup
            .addSystem(new InitRenderSystem())
            .addSystem(new MoveSystem())
            .addSystem(new RenderSystem())
            ;

        let debugGroup = new ecs.SystemGroup("调试组", 30);
        debugGroup.addSystem(new EntityLogSystem());

        world.addSystem(defGroup);
        world.addSystem(debugGroup);

        world.initialize();
        this._world = world;
    }

    public static get world(): ecs.World {
        return this._world;
    }

    public static get singleton(): ecs.Entity {
        if (!this._singleton) {
            this._singleton = this._world.createEmptyEntity();
        }
        return this._singleton;
    }

    public static get node(): ccc.Node {
        return this._node;
    }

    public static set node(node: ccc.Node) {
        this._node = node;
    }

    /** 添加单例组件 */
    public static addSingleton<T extends ecs.IComponent>(component: ecs.ComponentType<T>): T {
        return this._world.addComponent(this.singleton, component);
    }

    /** 移除单例组件 */
    public static removeSingleton<T extends ecs.IComponent>(component: ecs.ComponentType<T>): void {
        this._world.removeComponent(this.singleton, component);
    }

    /** 获取单例组件 */
    public static getSingleton<T extends ecs.IComponent>(component: ecs.ComponentType<T>): T {
        return this._world.getComponent(this.singleton, component);
    }

    public static clear(): void {
        this._world.clear();
        this._singleton = null;
    }
}