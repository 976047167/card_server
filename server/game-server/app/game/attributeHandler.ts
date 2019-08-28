import BattlePlayer, { IPlayerInfo } from "./battlePlayer";

export interface IAttribute {
    str: number;
    agi: number;
    spi: number;
    sta: number;
    int: number;
    per: number;
    derive?: {
        initiative: number;
        immunity: number;
        tenacious: number;
        [others: string]: number;
    };
}
export type DecoratorId = number;
export default class AttributeHandler implements IAttribute {
    /**
     * 力量
     */
    public get str(): number {
        return this.baseAttribute.str + this.decorator.str;
    }
    /**
     * 敏捷
     */
    public get agi(): number {
        return this.baseAttribute.agi + this.decorator.str;
    }
    /**
     * 耐力
     */
    public get sta(): number {
        return this.baseAttribute.sta + this.decorator.sta;
    }
    /**
     * 感知
     */
    public get per(): number {
        return this.baseAttribute.per + this.decorator.per;
    }
    /**
     * 智力
     */
    public get int(): number {
        return this.baseAttribute.int + this.decorator.int;
    }
    /**
     * 意志
     */
    public get spi(): number {
        return this.baseAttribute.spi + this.decorator.spi;
    }
    /**
     * 衍生属性
     */
    public get derive() {
        return {
            /**
             * 免疫
             */
            get immunity(): number {
                return this.sta + this.spi;
            },
            /**
             * 强韧
             */
            get tenacious(): number {
                return this.sta + this.spi;
            },
            /**
             * 先攻值
             */
            get initiative(): number {
                return this.per + this.agi;
            },
        };
    }

    /**
     * 属性装饰器
     */
    private get decorator() {
        let decorator: IAttribute = {
            agi: 0,
            int: 0,
            per: 0,
            spi: 0,
            sta: 0,
            str: 0,
            derive: {
                immunity: 0,
                initiative: 0,
                tenacious: 0,
            },
        };
        for (const dId in this._applyMap) {
            if (this._applyMap.hasOwnProperty(dId)) {
                const handle = this._applyMap[dId];
                decorator = handle(decorator);
            }
        }
        return decorator;
    }
    private baseAttribute: IAttribute;
    private _applyMap: {
        [dId: number]: (attribute: IAttribute) => IAttribute;
    };
    private _dId: DecoratorId = 0;
    constructor(player: BattlePlayer) {
        this.initAttribute(player.getInfo());
    }
    public registerAtrributeHandle(apply: (arg: IAttribute) => IAttribute) {
        this._dId++;
        this._applyMap[this._dId] = apply;
        return this._dId;
    }
    public removeAttributeHandle(did: DecoratorId) {
        if (this._applyMap[did]) {
            delete this._applyMap[did];
        }
    }

    private initAttribute(info: IPlayerInfo) {
        this.baseAttribute = {
            agi: info.attribute.agile,
            int: info.attribute.intellect,
            per: info.attribute.perception,
            spi: info.attribute.spirit,
            sta: info.attribute.stamina,
            str: info.attribute.strength,
        };
    }
}
