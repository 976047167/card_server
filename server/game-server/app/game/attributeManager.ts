export type DecoratorId = number;
interface IAttribute {
	name:string,
	value:number,
	derived?:{//如果是衍生属性，则有以下几成员
		base:string[], //如果是衍生属性，则应该基于其他属性
		isDirty:boolean,
		update:(...a)=>void,
	}
	effected:Set<IAttribute>, //用于反查关联属性
}
export default class AttributeManager {
	/**
	 * 属性储存map
	 */
	private _atrMap:Map<string, IAttribute>;
	// /**
	//  * 装饰器handler数组
	//  */
	// private _applyMap: {
	// 	[dId: number]: (attribute: any) => any;
	// };
	// private _dId: DecoratorId = 0;
	constructor () {
		this._atrMap = new Map();
		// this.initAttribute(player.getInfo());
	}
	// /**
	//  * 属性装饰器
	//  */
	// private get decorator () {
	// 	let decorator = {
	// 		agi: 0,
	// 		int: 0,
	// 		per: 0,
	// 		spi: 0,
	// 		sta: 0,
	// 		str: 0,
	// 		derive: {
	// 			immunity: 0,
	// 			initiative: 0,
	// 			tenacious: 0,
	// 		},
	// 	};
	// 	for (const dId in this._applyMap) {
	// 		if (this._applyMap.hasOwnProperty(dId)) {
	// 			const handle = this._applyMap[dId];
	// 			decorator = handle(decorator);
	// 		}
	// 	}
	// 	return decorator;
	// }

	// /**
	//  * 添加装饰器
	//  * @param apply 装饰器handler
	//  */
	// public registerAtrributeHandle (apply: (arg: any) => any): DecoratorId {
	// 	this._dId++;
	// 	this._applyMap[this._dId] = apply;
	// 	return this._dId;
	// }
	// /**
	//  * 移除装饰器
	//  * @param did 装饰器Id
	//  */
	// public removeAttributeHandle (did: DecoratorId) {
	// 	if (this._applyMap[did]) {
	// 		delete this._applyMap[did];
	// 	}
	// }

	// private initAttribute (info: IPlayerInfo) {
	// 	console.log("initAttribute");
	// }
	public get (name:string) {
		if (!this._atrMap.has(name)) return 0;
		const a:IAttribute = this._atrMap.get(name);
		!a.derived || !a.derived.isDirty || a.derived.update();//别问，问就是炫技
		return a.value;
	}
	/**
	 * 设置基础属性值
	 * @param name 属性名
	 * @param value 值
	 */
	public setBaseAtr (name:string, value:number) {
		let a:IAttribute;
		if (!this._atrMap.has(name)) {
			a = {
				name,
				value,
				effected:new Set()
			};
			this._atrMap.set(name, a);
		} else {
			a = this._atrMap.get(name);
		}
		if (a.derived) {
			console.warn("can't set base attribute");
			return;
		}
		a.value = value;
		this.setEffectAtrDirty(a);
	}
	private setEffectAtrDirty (a:IAttribute) {
		for (const eff of a.effected) {
			if (eff.derived.isDirty) continue;
			eff.derived.isDirty = true;
			this.setEffectAtrDirty(eff);
		}
	}

	/**
	 * 添加衍生属性
	 * @param name 属性名
	 * @param base 衍生属性所依赖的基础属性名列表
	 * @param cal 以基础属性为参数，计算衍生属性值的算式
	 */
	public addDerivedAtr (name:string, base:string[], cal:string) {
		let a:IAttribute;
		if (this._atrMap.has(name)) {
			a = this._atrMap.get(name);
			if (!a.derived) {
				console.warn(`add derived attribute faild,this name '${name}' has already beeen used in base attribute!`);
				return;
			}
			a.derived.base.forEach((s)=>{
				const ia = this._atrMap.get(s);
				ia.effected.delete(a);
			});
		} else {
			a = {
				name,
				value:0,
				effected:new Set(),
				derived:{
					isDirty:false,
					base,
					update:null
				}

			};
			this._atrMap.set(name, a);
		}

		//给基础属性添加衍生关联
		base.forEach((baseName)=>{
			if (!this._atrMap.has(baseName)) {
				this.setBaseAtr(baseName, 0);
			}
			const sa = this._atrMap.get(baseName);
			sa.effected.add(a);
		});
		//生成update方法并调用
		const func = eval(`(args)=>{return ${cal}}`);
		const update = ()=> {
			const values = a.derived.base.map((n)=>{
				return this.get(n);
			});
			a.value = func(values);
			a.derived.isDirty = false;
		};
		a.derived.update = update;
		a.derived.update();

	}
}
