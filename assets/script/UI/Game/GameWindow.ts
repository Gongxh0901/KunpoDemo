/**
 * @Author: Gongxh
 * @Date: 2025-01-16
 * @Description: 战斗界面
 */

import { Direction } from "../../ecs/component/Direction";
import { LifeTime } from "../../ecs/component/LifeTime";
import { Position } from "../../ecs/component/Position";
import { Speed } from "../../ecs/component/Speed";
import { fgui, kunpo } from "../../header";
import { WorldHelper } from "../../Helper/WorldHelper";
const { uiclass, uiprop, uiclick } = kunpo._uidecorator;

@uiclass("Window", "Game", "GameWindow")
export class GameWindow extends kunpo.Window {
    @uiprop container: fgui.GComponent;

    private interval: number = 0;
    public onInit() {
        console.log("GameWindow onInit");
        this.adapterType = kunpo.AdapterType.Full;
        this.type = kunpo.WindowType.CloseAll;
        this.bgAlpha = 0;
    }

    protected onShow() {
        console.log("GameWindow onShow");
    }

    protected onClose() {
        WorldHelper.world.clear();
    }

    @uiclick
    private onBack(): void {
        kunpo.WindowManager.showWindow("HomeWindow");
    }

    @uiclick
    private onCreateEntity(): void {
        for (let i = 0; i < 500000; i++) {
            let entity = WorldHelper.world.createEntity();
            let position = WorldHelper.world.addComponent(entity, Position);
            let speed = WorldHelper.world.addComponent(entity, Speed);
            let direction = WorldHelper.world.addComponent(entity, Direction);
            let lifeTime = WorldHelper.world.addComponent(entity, LifeTime);

            position.x = 100;
            position.y = 100;
            speed.speed = 1;

            direction.x = 1;
            direction.y = 1;
            lifeTime.lifeTime = 30;// Math.randRange(10, 30);
        }
    }

    protected onUpdate(dt: number): void {
        // this.interval += dt;
        // if (this.interval > 1) {
        //     this.interval -= 1;
        //     for (let i = 0; i < 50000; i++) {
        //         let entity = WorldHelper.world.createEntity();
        //         let position = WorldHelper.world.addComponent(entity, Position);
        //         let speed = WorldHelper.world.addComponent(entity, Speed);
        //         let direction = WorldHelper.world.addComponent(entity, Direction);
        //         let lifeTime = WorldHelper.world.addComponent(entity, LifeTime);

        //         position.x = 100;
        //         position.y = 100;
        //         speed.speed = 1;

        //         direction.x = 1;
        //         direction.y = 1;
        //         lifeTime.lifeTime = 1;// Math.randRange(10, 30);
        //     }
        // }
        // let time1 = kunpo.Time.now();
        WorldHelper.world.update(dt);
        // console.log(`帧耗时: ${kunpo.Time.now() - time1}ms`);
    }
}
