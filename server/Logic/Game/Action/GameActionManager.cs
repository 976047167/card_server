using System.Collections;
using System.Collections.Generic;
namespace Logic
{
	namespace Action
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
			public void pushAction(ACTION_TYPE type, AcitonArg args)
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
					System.Console.WriteLine("action trigger", action.type.ToString());
					action.doTrigger();
				}
				else
				{
					this.actionsStack.Pop();

					System.Console.WriteLine("action dealing "+action.type.ToString());
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
				System.Console.WriteLine("action done");
				this.isDealing = false;
				foreach(var action in this.doneStack){
					action.clear();
					GameActionPool.getInstance().recycle(action);
				}
				this.doneStack.Clear();
			}
		}
	}

}