namespace Logic.Action
{


	/// <summary>
	/// <para> GameAction 游戏行为（以后统称GA) </para>
	/// <para> GA通常由一个BO直接调用或设置后由时点触发。 </para>
	/// <para> GA会产生游戏动画，但不是所有GA都产生游戏动画 </para>
	/// <para>一个GA会导致触发另一个或多个GA。</para>
	/// <para>一个GA有宣告处理，和处理完成两个时点</para>
	/// <para>GA每次状态发生改变后，会周知Trigger</para>
	/// <para>GA处理之前会宣告时点，此时若响应其他GA，那么优先处理响应的那些GA</para>
	/// <para>宣告处理多条GA时，按序触发并处理，若处理完后原GA被否决，则不再继续触发</para>
	/// <para>如果GA处理被否决，不会触发处理完成时点</para>
	/// </summary>
	abstract class GameActionBase
	{
		public ACTION_STATE state { get; private set; }
		protected BattleObject target { get; private set; }
		protected BattleObject creator { get; private set; }
		protected Trigger trigger { get; private set; }
		public ACTION_TYPE type { get; internal set;}
		protected GameActionManager GAM { get; private set; }
		protected Battle battle { get; private set; }
		protected AcitonArg? extraData;
		public GameActionBase()
		{
			//
		}

		/// <summary>
		/// 做一些默认的初始化操作，之后交由子类的onCreator方法自己完成
		/// </summary>
		/// <param name="battle">action所属的battle</param>
		/// <param name="args">传给子类的arg</param>
		public void initialize(Battle battle, AcitonArg args)
		{
			this.creator = battle.getObjectByBId<BattleObject>(args.creator);
			this.target = this.creator;
			this.battle = battle;
			this.trigger = this.battle.trigger;
			this.GAM = this.battle.actionManager;
			this.extraData = args;
			this.target = battle.getObjectByBId<BattleObject>(args.creator); ;
			this.onCreator(args);
		}

		/// <summary>
		/// 子类进行初始化，用于给特殊变量赋值，或者注册监听
		/// </summary>
		/// <param name="args">传给子类的arg</param>
		protected virtual void onCreator(AcitonArg args)
		{

		}
		private void setState(ACTION_STATE foo)
		{
			this.state = foo;
			this.trigger.notify(this);
		}
		public void rejected()
		{
			if (this.state != ACTION_STATE.TRIGGERED) return;
			this.setState(ACTION_STATE.REJECTED);
		}
		internal void doTrigger()
		{
			if (this.state != ACTION_STATE.UNTRIGGERED) return;
			this.setState(ACTION_STATE.TRIGGERED);
		}
		internal void doDeal()
		{
			if (this.state == ACTION_STATE.REJECTED)
			{
				return;
			}
			this.setState(ACTION_STATE.WORKING);
			this.deal();
			this.done();
			this.setState(ACTION_STATE.COMPLETED);
		}
		protected virtual void deal()
		{
			//
		}
		/// <summary>
		/// <para>主要用来生成log,用于客户端表现。</para>
		/// <para>需要注意深拷贝数据,防止引用。</para>
		/// </summary>
		protected virtual void done()
		{
			//
		}

		/// <summary>
		/// 删除数据引用，返回池中
		/// </summary>
		internal void clear()
		{
			this.creator = null;
			this.target = null;
			this.battle = null;
			this.trigger = null;
			this.GAM = null;
			this.extraData = null;
			this.onDestory();
		}
		protected virtual void onDestory()
		{

		}
	}

}