using System;
using System.Collections;
using System.Reflection;
using System.Collections.Generic;
namespace Logic
{
	namespace Action
	{


		class GameActionPool
		{

			private static GameActionPool _instance;
			internal static GameActionPool getInstance()
			{
				if (_instance == null) { _instance = new GameActionPool(); }
				return _instance;
			}
			private Dictionary<int, Stack<GameActionBase>> actionPools;//不用enum，防止gc
			private GameActionPool()
			{
				this.actionPools = new Dictionary<int, Stack<GameActionBase>>();
				Assembly asm = Assembly.GetExecutingAssembly();
				Type[] types = asm.GetTypes();
				foreach (var t in types)
				{
					if(t.BaseType !=typeof( GameActionBase)) continue;
					Console.WriteLine(t.Name);

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
				GameActionBase actionClass = ACTION_INDEX[actionType];
				if (!actionClass)
				{
					ConsolC.Write("create action failed! illgal type: " + actionType);
					return;
				}
				return new actionClass();
			}
		}
	}
}