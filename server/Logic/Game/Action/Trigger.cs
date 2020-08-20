using System.Collections.Generic;
namespace Logic.Action
{

	delegate void Effect(GameActionBase action);
	class Trigger
	{
		private Dictionary<ACTION_TYPE, List<int>> _triggerMap;//保证触发顺序，这里用list
		private int _tid = 0;
		private Dictionary<int, Effect> _tidMap;
		public Trigger()
		{
			this._tidMap = new Dictionary<int, Effect>();
			this._triggerMap = new Dictionary<ACTION_TYPE, List<int>>();
		}
		public int register(ACTION_TYPE type, Effect effect)
		{
			if (!this._triggerMap.ContainsKey(type))
			{
				this._triggerMap.Add(type, new List<int>());
			}
			this._tid++;
			this._triggerMap[type].Add(this._tid);
			this._tidMap.TryAdd(this._tid, effect);
			return this._tid;
		}
		internal void notify(GameActionBase action)
		{
			ACTION_TYPE type = action.type;
			if (!this._triggerMap.ContainsKey(type)) { return; }
			List<int> tidList = this._triggerMap[type];
			if (tidList.Count == 0) { return; }
			HashSet<int> toDelete = new HashSet<int>();
			foreach (int tid in tidList)
			{
				if (!this._tidMap.ContainsKey(tid))
				{
					toDelete.Add(tid);
				}
				else
				{
					Effect a = this._tidMap[tid];
					a(action);
				}
			}
			foreach (int tid in toDelete)
			{
				tidList.Remove(tid);
			}
		}
		public void remove(int tid)
		{
			this._tidMap.Remove(tid);
		}
	}

}