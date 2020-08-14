using System.Collections
namespace Logic
{
	class GameActionManager
	{
	private Stack< GameActionBase> actionsStack ;
	private Stack<GameActionBase> doneStack ;
	private bool  isDealing = false;
	private  Battle battle;
	private Trigger trigger;
	public GameActionManager( Battle battle)
		{
			this.battle = battle;
			this.trigger = battle.trigger;
			this.actionsStack = new Stack();
			this.doneStack = new Stack();
		}
		public void pushAction(ACTION_TYPE type)
		{
			const action = gameActionPool.getAction(this.battle, type, args);
			this.actionsStack.push(action);
			if (!this.isDealing)
			{
				this.isDealing = true;
				this.dealActions();
			}
		}
		private dealActions()
		{
			const len = this.actionsStack.length;
			const action = this.actionsStack[len - 1];
			if (action.state === ACTION_STATE.UNTRIGGERED)
			{
				console.log("action trigger", ACTION_TYPE[action.type]);
				action.doTrigger();
			}
			else
			{
				this.actionsStack.pop();
				console.log("action dealing", ACTION_TYPE[action.type]);
				action.doDeal();
				this.doneStack.push(action);
			}
			if (this.actionsStack.length != 0)
			{
				this.dealActions();
			}
			else
			{
				this.doneAcions();
			}
		}
		private doneAcions()
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
