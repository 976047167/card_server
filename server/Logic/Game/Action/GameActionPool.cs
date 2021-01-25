using System.Runtime.CompilerServices;
using System;
using System.Collections;
using System.Reflection;
using System.Collections.Generic;
namespace Logic.Action
{


	internal class GameActionPool
	{

		private static GameActionPool _instance;
		internal static GameActionPool getInstance()
		{
			if (_instance == null) { _instance = new GameActionPool(); }
			return _instance;
		}
		private Dictionary<int, Stack<GameActionBase>> actionPools;//不用enum，防止gc
		private Dictionary<int, Type> typeMap;//不用enum，防止gc
		private GameActionPool()
		{
			this.actionPools = new Dictionary<int, Stack<GameActionBase>>();
			this.typeMap = =new Dictionary<int, Type>();
			Assembly asm = Assembly.GetExecutingAssembly();
			Type[] types = asm.GetTypes();
			foreach (var t in types)
			{
				if (t.BaseType != typeof(GameActionBase)) continue;
				Console.WriteLine(t.Name);
				object[] attrbutes = t.GetCustomAttributes(t,false);
				foreach (var atr in attrbutes)
				{
					if(atr is GameActionType){
						GameActionType ret = (GameActionType)atr;
						int idx = (int)ret.type;
						this.typeMap.TryAdd(idx,t);
						break;
					}
				}

			}

		}
		public GameActionBase getAction(Battle battle, ACTION_TYPE type, AcitonArg args)
		{
			Stack<GameActionBase> pool;
			bool has = this.actionPools.TryGetValue((int)type, out pool);
			GameActionBase action;
			if (has && pool.Count > 0)
			{
				action = pool.Pop();
			}
			else
			{
				action = this.createAction(type);
			}
			action.initialize(battle, args);
			return action;
		}
		public void recycle(GameActionBase action)
		{
			ACTION_TYPE type = action.type;
			if (!this.actionPools.ContainsKey((int)type))
			{
				this.actionPools.Add((int)type, new Stack<GameActionBase>());
			}
			this.actionPools[(int)type].Push(action);
		}

		private GameActionBase createAction(ACTION_TYPE actionType)
		{
			Type actionClass;
			this.typeMap.TryGetValue((int)actionType, out actionClass);
			if (actionClass == null)
			{
				System.Console.WriteLine("create action failed! illgal type: " + actionType);
				return null;
			}
			GameActionBase ret =(GameActionBase)Activator.CreateInstance(actionClass);
			ret.type = actionType;
			return ret;
		}
	}
}