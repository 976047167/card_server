using System.Collections;
using System.Collections.Generic;
namespace Logic{

class GameActionPool {

	private static GameActionPool _instance;
	public static GameActionPool getInstance () {
		if (_instance == null) {_instance = new GameActionPool(); }
		return _instance;
	}
	private  Dictionary<ACTION_TYPE,Stack< GameActionBase>>  actionPools;
	private GameActionPool(){
		this.actionPools =new Dictionary<ACTION_TYPE, Stack<GameActionBase>>();
	}
	public GameActionBase getAction (Battle battle, ACTION_TYPE type, AcitonArg args) {
		Stack<GameActionBase> pool ;
		bool has = this.actionPools.TryGetValue(type,out pool);
		GameActionBase action;
		if (has && pool.Count > 0) {
			action = pool.Pop();
		} else {
			action = this.createAction(type);
		}
		action.initialize(battle, args);
		return action;
	}
	public void recycle ( GameActionBase action) {
		ACTION_TYPE type = action.type;
		if (!this.actionPools.ContainsKey(type)) {
			this.actionPools.Add(type,new Stack<GameActionBase>());
		}
		this.actionPools[type].Push(action);
	}

	private GameActionBase createAction ( ACTION_TYPE actionType) {
		GameActionBase actionClass = ACTION_INDEX[actionType];
		if (!actionClass) {
			console.warn("create action failed! illgal type: " + actionType);
			return;
		}
		return new actionClass();
	}
}
}