/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 
 */
import { EntityLogSystem } from "../ecs/system/debug/EntityLogSystem";
import { LifeTimeSystem } from "../ecs/system/LifeTimeSystem";
import { MoveSystem } from "../ecs/system/MoveSystem";
import { ecs } from "../header";

export class WorldHelper {
    private static _world: ecs.World;

    /**
     * 只能注册一次
     */
    public static register(): void {
        if (this._world) {
            return;
        }
        let world = new ecs.World("战斗世界");

        let defGroup = new ecs.SystemGroup("默认组");
        defGroup.addSystem(new MoveSystem())
            .addSystem(new LifeTimeSystem());

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
}