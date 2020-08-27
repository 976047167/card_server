

using System.Collections.Generic;
using System.Linq;
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
	public int registerAtrributeHandle (Decorator decorator ) {
		if (!this._atrMap.ContainsKey(decorator.name)) { return 0;}
		IAttribute a = this._atrMap[decorator.name];
		this._dId++;
		this._decoratorMap.TryAdd(this._dId, decorator);
		a.dHandlers.Add(decorator.apply);
		this.setEffectAtrDirty(a);
		return this._dId;
	}
	/**
	 * 移除装饰器
	 * @param did 装饰器Id
	 */
	public void removeAttributeHandle (int did ) {
		if (!this._decoratorMap.ContainsKey(did)) return;
		Decorator d = this._decoratorMap[did];
		string name = d.name;
		if (!this._atrMap.ContainsKey(name)) return;
		IAttribute a = this._atrMap[name];
		a.dHandlers.Remove(d.apply);
		this._decoratorMap.Remove(did);
		this.setEffectAtrDirty(a);
	}

	/**
	 * 获取属性的值
	 * @param name 属性名
	 */
	public double get (string name) {
		if (!this._atrMap.ContainsKey(name)) return 0;
		IAttribute a = this._atrMap[name];
		if (a.derived.HasValue && a.derived.Value.isDirty) {
			a.derived.Value.update();
		}
		double ret = a.value;
		foreach (var iterator in a.dHandlers) {
			ret = iterator(ret);
		}
		return ret;
	}
	/**
	 * 设置基础属性值
	 * @param name 属性名
	 * @param value 值
	 */
	public void setBaseAtr ( string name,double value) {
		IAttribute a;
		if (!this._atrMap.ContainsKey(name)) {
			a.name = name;
			a.value = value;
			a.effected = new HashSet<IAttribute>();
			a.dHandlers = new List<Dhandler>();
			a.derived = null;
			this._atrMap.TryAdd(name, a);
		} else {
			a = this._atrMap[name];
		}
		if (a.derived.HasValue) {
			System.Console.WriteLine("can't set base attribute");
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
	private void setEffectAtrDirty (IAttribute atr) {
		foreach (var eff in atr.effected) {
			if(!eff.derived.HasValue) continue;
			Derived d =  eff.derived.Value;
			if (d.isDirty) continue;
			d.isDirty = true;
			this.setEffectAtrDirty(eff);
		}
	}

	/**
	 * 添加衍生属性
	 * @param name 属性名
	 * @param base 衍生属性所依赖的基础属性名列表
	 * @param cal 以基础属性为参数，计算衍生属性值的算式
	 */
	public void addDerivedAtr (string name,string[] baseAtrs,string cal) {
		IAttribute a;
		if (this._atrMap.ContainsKey(name)) {
			a = this._atrMap[name];
			if (!a.derived.HasValue) {
				System.Console.WriteLine("add derived attribute faild,this name '{0}' has already beeen used in base attribute!",name);
				return;
			}
			foreach (var item in a.derived.Value.baseAtrs)
			{
				IAttribute ia = this._atrMap[item];
				ia.effected.Remove(a);
			}
		} else {
			Derived d;
			d.isDirty = false;
			d.baseAtrs =new List<string>(baseAtrs);
			d.update = null;
			a.name = name;
			a.value = 0;
			a.effected = new HashSet<IAttribute>();
			a.dHandlers = new List<Dhandler>();
			a.derived = d;

			this._atrMap.TryAdd(name, a);
		}

		//给基础属性添加衍生关联
		foreach (var baseAtrName in baseAtrs)
		{

			if (!this._atrMap.ContainsKey(baseAtrName )) {
				this.setBaseAtr(baseAtrName , 0);
			}
			var sa = this._atrMap[baseAtrName];
			sa.effected.Add(a);
		}
		Derived derived = a.derived.Value;
		//生成update方法并调用
		CalDerived func = eval();
		System.Action update = ()=> {
			List<double> values =derived.baseAtrs.Select(ba=>{return this.get(ba);}).ToList();
			a.value = func(values);
			derived.isDirty = false;
		};
		derived.update = update;
		derived.update();
	}
}

}