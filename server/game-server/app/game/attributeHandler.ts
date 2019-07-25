import BattlePlayer, { IPlayerInfo } from "./battlePlayer";

export interface IAttribute {
    str: number;
    agi: number;
    spi: number;
    sta: number;
    int: number;
    per: number;
    derive?: {
        initiative: number
        [derive: string]: number;
    };
}
export default class AttributeHandler {
    /**力量
     *
     */
    public get strength(): number {
        return this.baseAttribute.str + this.decorator.str;
    }
    /**
     * 敏捷
     */
    public get agile(): number {
        return this.baseAttribute.agi + this.decorator.str;
    }
    /**耐力
     *
     */
    public get stamina(): number {
        return this.baseAttribute.sta + this.decorator.sta;
    }
    /**感知
     *
     */
    public get perception(): number {
        return this.baseAttribute.per + this.decorator.per;
    }
    /**智力
     *
     */
    public get intellect(): number {
        return this.baseAttribute.int + this.decorator.int;
    }
    /**意志
     *
     */
    public get spirit(): number {
        return this.baseAttribute.spi + this.decorator.spi;
    }
    /**
     * 免疫
     */
    public get immunity(): number {
        return this.stamina + this.spirit;
    }
    /**
     * 强韧
     */
    public get tenacious(): number {
        return this.stamina + this.spirit;
    }
    /**
     * 先攻值
     */
    public get initiative(): number {
        return this.perception + this.agile;
    }
    /**
     * 属性装饰器
     */
    private get decorator() {
        let decodrator = {
            agi: 0,
            int: 0,
            per: 0,
            spi: 0,
            sta: 0,
            str: 0,
        };
        for (const did in this._applyMap) {
            if (this._applyMap.hasOwnProperty(did)) {
                const handle = this._applyMap[did];
                decodrator = handle(decodrator);
            }
        }
        return decodrator;
    }
    private baseAttribute: IAttribute;
    private _applyMap: {
        [did: number]: (IBaseAttribute) => IAttribute;
    };
    private _did: number = 0;
    constructor(player: BattlePlayer) {
        this.initAttribute(player.getInfo());
    }
    public registerAtrributeHandle(apply: (arg: IAttribute) => IAttribute) {
        this._did++;
        this._applyMap[this._did] = apply;
    }
    public removeAttributeHandle(did: number) {
        if (this._applyMap[did]) {
            delete this._applyMap[did];
        }
    }

    private initAttribute(info: IPlayerInfo) {
        this.baseAttribute = {
            agi : info.attribute.agile,
            int : info.attribute.intellect,
            per : info.attribute.perception,
            spi : info.attribute.spirit,
            sta : info.attribute.stamina,
            str : info.attribute.strength,
        };
    }
}
