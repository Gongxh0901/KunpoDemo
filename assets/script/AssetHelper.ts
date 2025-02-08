/*
 * @Description: 资源管理
 * @Author: Gongxh
 * @Date: 2021-06-10 09:30:39
 */

import { cc } from "./header";

export class AssetPool {
    private static _assets: { [path: string]: cc.Asset } = {};

    public static get assets(): { [path: string]: cc.Asset } {
        return this._assets;
    }

    public static getResourceCount(dir: string, type: typeof cc.Asset): number {
        dir = cc.assetManager.utils.normalize(dir);
        if (dir[dir.length - 1] === "/") {
            dir = dir.slice(0, -1);
        }
        let list = cc.resources.getDirWithPath(dir, type);
        return list.length;
    }

    public static getResourceNames(dir: string, type: typeof cc.Asset): Array<string> {
        let names: string[] = [];
        let path = cc.assetManager.utils.normalize(dir);
        if (path[path.length - 1] === "/") {
            path = path.slice(0, -1);
        }
        let list = cc.resources.getDirWithPath(path, type);
        for (const asset of list) {
            let paths = asset.path.split('/');
            let pathName = `${path}/${paths[paths.length - 1]}`;
            names.push(pathName);
        }
        return names;
    }

    /** 批量添加资源 */
    public static addAssets(assets: cc.Asset[]): void {
        for (const asset of assets) {
            this.addAsset(asset);
        }
    }

    public static addAsset(asset: cc.Asset, bundle: cc.AssetManager.Bundle = cc.resources) {
        if (this._assets[asset.name]) {
            return;
        }
        asset.addRef();
        this._assets[asset.name] = asset;
    }

    public static addAssetByName(asset: cc.Asset, name: string) {
        asset.addRef();
        this._assets[name] = asset;
    }

    public static isHaveAsset(path: string): boolean {
        if (!this._assets[path]) {
            return false;
        }
        return true;
    }

    public static getAsset<T extends cc.Asset>(path: string): T {
        if (!this._assets[path]) {
            if (path.indexOf("ui_icons/icon") != -1) {
                console.warn(`Error: icon资源${path}未加载`);
                return this._assets["ui_icons/notfound"] as T;
            } else {
                throw new Error(`Error: 资源${path}未加载`);
            }
        }
        return this._assets[path] as T;
    }

    /** 按资源路径释放资源 */
    public static releaseAsset(path: string): void {
        if (this._assets[path]) {
            this._assets[path].decRef();
            delete this._assets[path];
        }
    }

    /** 按文件夹释放资源 */
    public static releaseDir(dir: string, asset: typeof cc.Asset) {
        let list = this.getResourceNames(dir, asset);
        for (const name of list) {
            this.releaseAsset(name);
        }
    }

    /** 释放所有加载的资源 */
    public static releaseAll(): void {
        for (const key in this._assets) {
            this._assets[key].decRef();
        }
        this._assets = {};
    }
}

/*
 * @Description: 资源加载
 * @Author: Gongxh
 * @Date: 2021-06-10 09:30:39
 */
enum StateType {
    Error,
    Queue,
    Loading,
    Finish,
}
interface IItemData {
    type: any;
    path: string;
    isFile: boolean;

    state: StateType; // 资源的加载状态
    count: number; // 资源的加载次数
}
export class AssetLoader {
    public static loadBundleRes<T extends cc.Asset>(bundlename: string, filename: string, type: typeof cc.Asset, onComplete: (asset: T) => void, onFail?: (error: Error) => void): void {
        let bundle = cc.assetManager.getBundle(bundlename);
        if (bundle) {
            bundle.load(filename, type, (error: Error, asset: T) => {
                if (error) {
                    // kunpo.warn(`bundle:${bundlename} - file:${filename} 加载失败`);
                    onFail && onFail(error);
                } else {
                    onComplete(asset);
                }
            });
        } else {
            cc.assetManager.loadBundle(bundlename, (err: Error, bundle: cc.AssetManager.Bundle) => {
                if (err) {
                    // kunpo.warn(`bundle:${bundlename} 加载失败`);
                    onFail && onFail(err);
                    return;
                }
                bundle.load(filename, type, (error: Error, asset: T) => {
                    if (error) {
                        // kunpo.warn(`bundle:${bundlename} - file:${filename} 加载失败`);
                        onFail && onFail(error);
                    } else {
                        onComplete(asset);
                    }
                });
            });
        }
    }

    public static removeBundleRes(bundlename: string, filename: string, type: typeof cc.Asset): void {
        let bundle = cc.assetManager.getBundle(bundlename);
        bundle && bundle.release(filename, type);
    }

    public static loadResAsset<T extends cc.Asset>(path: string, type: typeof cc.Asset, onComplete: (asset: T) => void, onFail?: (error: Error) => void): void {
        cc.resources.load(path, type, (error: Error, asset: cc.Asset) => {
            if (error) {
                cc.log("loadResAsset资源加载失败filename:--", path);
                onFail && onFail(error);
            } else {
                AssetPool.addAsset(asset);
                onComplete(asset as T);
            }
        });
    }

    private _name: string = "";
    private _items: IItemData[] = [];
    /** load完成的资源数量 */
    private _completeCounts: Map<string, number> = new Map();
    /** 对应目录下的资源数量 （只有文件夹才会有值） */
    private _path2Count: Map<string, number> = new Map();
    /** 所有资源总量 */
    private _total: number = 0;
    /** 当前并行数量 */
    private _parallel: number = 0;
    private _progress: (percent: number) => void;
    private _complete: () => void;

    public constructor(name?: string) {
        this._name = name;
    }

    /** 设置加载资源列表 */
    public setLoadItems(items: { type: any, path: string, isFile?: boolean }[]): void {
        for (const item of items) {
            this._items.push({ type: item.type, path: item.path, isFile: item.isFile || false, state: StateType.Queue, count: 0 })
        }
    }

    /** 设置加载回调 */
    public setCallbacks(progress: (percent: number) => void, complete: () => void): void {
        this._progress = progress;
        this._complete = complete;
    }

    /** 开始加载资源 */
    public start(): void {
        this._total = 0;
        this._parallel = 0;
        this._completeCounts.clear();
        for (let data of this._items) {
            if (data.isFile) {
                this._total += 1;
            } else {
                let count = AssetPool.getResourceCount(data.path, data.type);
                this._path2Count.set(data.path, count);
                this._total += count;
            }
        }
        let maxLoad = Math.min(this._items.length, 10);
        for (let i = 0; i < maxLoad; i++) {
            this._loadNext();
        }
    }

    public _loadNext(): void {
        let index = this._items.findIndex(item => item.state == StateType.Queue);
        if (index > -1) {
            let data = this._items[index];
            this._loadResources(index, data.path, data.type, data.isFile);
        } else if (!this._items.some(item => item.state != StateType.Finish)) {
            this._complete && this._complete();
        } else if (this._parallel <= 0) {
            let count = this._resetErrorItem();
            let maxLoad = Math.min(count, 10);
            for (let i = 0; i < maxLoad; i++) {
                this._loadNext();
            }
        }
    }

    /** 重置失败的资源数据, 并且返回数量 */
    private _resetErrorItem(): number {
        let result = 0;
        for (const data of this._items) {
            if (data.state == StateType.Error) {
                data.state = StateType.Queue;
                result++;
            }
        }
        return result;
    }

    private _loadResources(index: number, path: string, type: any, isFile: boolean): void {
        this._items[index].count++;
        this._items[index].state = StateType.Loading;
        this._parallel++;

        if (isFile) {
            cc.resources.load(path, type, (error: Error, asset: cc.Asset) => {
                this._parallel--;
                if (error) {
                    cc.log("资源加载失败filename:--", path, this._parallel);
                    this._items[index].state = StateType.Error;
                    this._completeCounts.delete(path);
                } else {
                    // 标记资源加载成功
                    this._items[index].state = StateType.Finish;
                    this._completeCounts.set(path, 1);
                    AssetPool.addAsset(asset);
                }

                this._progress && this._updateProgress();
                this._loadNext();
            });
        } else {
            cc.resources.loadDir(path, type,
                (finish: number, total: number) => {
                    if (this._progress && total > 0 && finish > 0) {
                        let value = Math.floor(this._path2Count.get(path) * (finish / total));
                        this._completeCounts.set(path, value);
                        this._updateProgress();
                    }
                },
                (error: Error, assets: Array<cc.Asset>) => {
                    this._parallel--;
                    if (error) {
                        // 资源加载失败，重置为等待加载中
                        this._items[index].state = StateType.Error;
                        this._completeCounts.delete(path);
                    } else {
                        // 标记资源加载成功
                        this._items[index].state = StateType.Finish;
                        this._completeCounts.set(path, assets.length);
                        AssetPool.addAssets(assets);
                    }
                    this._progress && this._updateProgress();
                    this._loadNext();
                }
            );
        }
    }

    /** 更新进度 */
    private _updateProgress(): void {
        let value = 0;
        for (const count of this._completeCounts.values()) {
            value += count;
        }
        this._progress(Math.clampf(value / this._total, 0, 1));
    }
}


interface IPreItemData {
    type: any;
    path: string;
    isFile: boolean;
}

export class AssetPreloader {
    private _items: IPreItemData[] = [];
    private _index: number = 0;
    /** 设置加载资源列表 */
    public setLoadItems(items: { type: any, path: string, isFile?: boolean }[]): void {
        for (const item of items) {
            if (item.isFile) {
                this._items.push({ type: item.type, path: item.path, isFile: item.isFile || false })
            } else {
                let res_names = AssetPool.getResourceNames(item.path, item.type);
                for (const name of res_names) {
                    this._items.push({ type: item.type, path: name, isFile: false })
                }
            }
        }
    }

    /** 开始加载资源 */
    public start(): void {
        this._index = 0;
        this._loadNext();
    }

    private _loadNext(): void {
        let item = this._items[this._index++];
        item && cc.resources.preload(item.path, item.type, () => {
            this._loadNext();
        });
    }
}