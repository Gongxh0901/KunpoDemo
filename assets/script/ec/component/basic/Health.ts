/**
 * @Author: Gongxh
 * @Date: 2025-01-14
 * @Description: 血量组件
 */

import { cc, kunpo } from "../../../header";
import { ComponentType } from "../../ComponentTypes";
const { ecclass, ecprop } = kunpo._ecdecorator;

enum HealthType {
    HP = 1,
    Max = 2,
    Current = 3
}

@ecclass("Health", ComponentType.Health, { describe: "血量组件" })
export class Health extends kunpo.Component {
    @ecprop({ type: "entity", defaultValue: "", displayName: "实体", tips: "实体" })
    private testentity: string = "";

    @ecprop({ type: "array", format: "entity", displayName: "实体数组", tips: "实体数组" })
    private testentityarray: string[] = [];

    @ecprop({ type: 'int', defaultValue: 0, displayName: "血量血量血量血量血量血量血量血量血量血量血量血量", tips: "当前血量提示" })
    private hp: number = 0;

    @ecprop({ type: 'float', defaultValue: 0, displayName: "最大血量", tips: "最大血量提示" })
    private maxHp: number = 0;

    @ecprop({ type: 'string', defaultValue: "", displayName: "字符串", tips: "字符串提示" })
    private string: string = "";

    @ecprop({ type: 'boolean', defaultValue: false, displayName: "布尔值", tips: "布尔值提示" })
    private bool: boolean = true;

    @ecprop({ type: "enum", format: cc.Enum(HealthType), defaultValue: HealthType.Current, displayName: "枚举", tips: "枚举提示" })
    private hpeunm: HealthType = HealthType.Current;

    @ecprop({ type: "spriteframe", displayName: "精灵帧" })
    private spriteFrame: cc.SpriteFrame;

    @ecprop({ type: "asset", displayName: "资源" })
    private asset: cc.Asset;

    @ecprop({ type: "prefab", displayName: "预制体" })
    private prefab: cc.Prefab;

    @ecprop({ type: "skeleton", displayName: "骨骼动画" })
    private skeleton: cc.Skeleton;

    @ecprop({ type: "particle", displayName: "粒子" })
    private particle: cc.ParticleAsset;

    @ecprop({ type: "animation", displayName: "动画" })
    private animation: cc.AnimationClip;

    @ecprop({ type: "audio", displayName: "音频" })
    private audio: cc.AudioClip;

    @ecprop({ type: "jsonAsset", displayName: "json资源" })
    private jsonAsset: cc.JsonAsset;

    @ecprop({
        type: "object", format: {
            hp1: {
                type: "object",
                format: {
                    hp: "int",
                    max: "int"
                }
            },
            hp2: {
                type: "object",
                format: {
                    hp: "int",
                    max: "int"
                }
            },
        },
    })
    private obj: { hp1: { hp: number, max: number }, hp2: { hp: number, max: number } };

    @ecprop({
        type: "array", format: "int",
    })
    private arr: number[];

    @ecprop({
        type: "array", format: { type: "object", format: { hp: "int", max: "int" } }
    })
    private arrobj: { hp: number, max: number }[];

    @ecprop({ type: "vec2", displayName: "向量2" })
    private vec2: cc.Vec2;

    @ecprop({ type: "vec3", displayName: "向量3" })
    private vec3: cc.Vec3;

    @ecprop({ type: "color", defaultValue: cc.Color.RED, displayName: "颜色" })
    private color: cc.Color;

    @ecprop({ type: "size", displayName: "尺寸" })
    private size: cc.Size;

    public parse(data: any): void {

    }

    protected onEnter(): void {

    }

    protected onRemove(): void {

    }
}