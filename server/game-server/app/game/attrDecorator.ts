export interface IAttribute {
    str: number;
    agi: number;
    spi: number;
    sta: number;
    int: number;
    per: number;
    derive?: {
        [derive: string]: number;
    };
}
export class AttributeHandle {
    public get decorator() {
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
    private _applyMap: {
        [did: number]: (IBaseAttribute) => IAttribute;
    };
    private _did: number = 0;
    public registerAtrributeHandle(apply: (arg: IAttribute) => IAttribute) {
        this._did++;
        this._applyMap[this._did] = apply;
    }
    public removeAttributeHandle(did: number) {
        if (this._applyMap[did]) {
            delete this._applyMap[did];
        }
    }
}
