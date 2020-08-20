// export type Dhandler = (a:number)=>number;
// export interface Decorator{
// 	name:string,
// 	apply:Dhandler
// }
// interface IAttribute {
// 	name:string,
// 	value:number,
// 	derived?:{//如果是衍生属性，则有以下几成员
// 		base:string[], //如果是衍生属性，则应该基于其他属性
// 		isDirty:boolean,
// 		update:(...a)=>void,
// 	}
// 	dHandlers:Set<Dhandler>
// 	effected:Set<IAttribute>, //用于反查关联属性
// }
using System.Collections.Generic;
namespace Logic{

class AttributeManager {
	/**
	 * 属性储存map
	 */
	private Dictionary<string, IAttribute> _atrMap;
	/**
	 * 装饰器handlerMap
	 */
	private Dictionary<int, Decorator> _decoratorMap;
	private  int _dId= 0;
	AttributeManager () {
		this._atrMap = new Dictionary<string, IAttribute>();
		// this.initAttribute(player.getInfo());
	}
	/**
	 * 添加装饰器
	 * @param apply 装饰器handler
	 */
	public int registerAtrributeHandle (decorator:Decorator) {
		if (!this._atrMap.ContainsKey(decorator.name)) { return 0;}
		const a = this._atrMap.get(decorator.name);
		this._dId++;
		this._decoratorMap.set(this._dId, decorator);
		a.dHandlers.add(decorator.apply);
		this.setEffectAtrDirty(a);
		return this._dId;
	}
	/**
	 * 移除装饰器
	 * @param did 装饰器Id
	 */
	public removeAttributeHandle (did: DecoratorId) {
		if (!this._decoratorMap.has(did)) return;
		const d = this._decoratorMap.get(did);
		const name = d.name;
		if (!this._atrMap.has(name)) return;
		const a = this._atrMap.get(name);
		a.dHandlers.delete(d.apply);
		this._decoratorMap.delete(did);
		this.setEffectAtrDirty(a);
	}

	/**
	 * 获取属性的值
	 * @param name 属性名
	 */
	public get (name:string) {
		if (!this._atrMap.has(name)) return 0;
		const a:IAttribute = this._atrMap.get(name);
		if (a.derived && a.derived.isDirty) {
			a.derived.update();
		}
		let ret = a.value;
		for (const iterator of a.dHandlers) {
			ret = iterator(ret);
		}
		return ret;
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
				value: value,
				effected:new Set(),
				dHandlers:new Set()
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
	/**
	 * 将影响属性设置dirty
	 * 当某个属性有变动时需要将所有影响的属性递归设置
	 * @param atr 改变的属性
	 */
	private setEffectAtrDirty (atr:IAttribute) {
		for (const eff of atr.effected) {
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
				},
				dHandlers:new Set()
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

}