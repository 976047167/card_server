using System.Collections;
using System.Collections.Generic;
namespace Logic
{
	class GameActionManager
	{
		private Stack<GameActionBase> actionsStack;
		private Stack<GameActionBase> doneStack;
		private bool isDealing = false;
		private Battle battle;
		private Trigger trigger;
		public GameActionManager(Battle battle)
		{
			this.battle = battle;
			this.trigger = battle.trigger;
			this.actionsStack = new Stack<GameActionBase>();
			this.doneStack = new Stack<GameActionBase>();
		}
		public void pushAction(ACTION_TYPE type,AcitonArg args)
		{
			GameActionBase action = GameActionPool.getInstance().getAction(this.battle, type, args);
			this.actionsStack.Push(action);
			if (!this.isDealing)
			{
				this.isDealing = true;
				this.dealActions();
			}
		}
		private void dealActions()
		{
			int len = this.actionsStack.Count;
			GameActionBase action = this.actionsStack[len - 1];
			if (action.state == ACTION_STATE.UNTRIGGERED)
			{
				Console.writeLine("action trigger", ACTION_TYPE[action.type]);
				action.doTrigger();
			}
			else
			{
				this.actionsStack.pop();
				console.log("action dealing", ACTION_TYPE[action.type]);
				action.doDeal();
				this.doneStack.Push(action);
			}
			if (this.actionsStack.Count != 0)
			{
				this.dealActions();
			}
			else
			{
				this.doneAcions();
			}
		}
		private void doneAcions()
		{
			console.log("action done");
			this.isDealing = false;
			this.doneStack.forEach(action =>
			{
				action.clear();
				gameActionPool.recycle(action);
			});
			this.doneStack.Clear();
		}
	}
}
