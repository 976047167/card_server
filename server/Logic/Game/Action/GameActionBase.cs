namespace Logic
{

	/// <summary>
	/// <para> GameAction 游戏行为（以后统称GA) </para>
	/// <para> GA通常由一个BO直接调用或设置后由时点触发。 </para>
	/// <para> GA会产生游戏动画，但不是所有GA都产生游戏动画 </para>
	/// <para>一个GA会导致触发另一个或多个GA。</para>
	/// 一个GA有宣告处理，和处理完成两个时点
	/// GA每次状态发生改变后，会周知Trigger
	/// GA处理之前会宣告时点，此时若响应其他GA，那么优先处理响应的那些GA
	/// 宣告处理多条GA时，按序触发并处理，若处理完后原GA被否决，则不再继续触发
	/// 如果GA处理被否决，不会触发处理完成时点
	/// </summary>
	class GameActionBase
	{
		public ACTION_STATE state { get; private set; }
		public BattleObject target { get; private set; }
		public BattleObject creator { get; private set; }
		public Trigger trigger { get; private set; }
		public ACTION_TYPE type { get; private set; }
		public GameActionManager GAM { get; private set; }
		public Battle battle { get; private set; }
		// public extraData: any;
		GameActionBase()
		{
			// const typeList = Object.keys(ACTION_INDEX);
			// // tslint:disable-next-line: prefer-for-of
			// for (let i = 0; i < typeList.length; i++) {
			// 	if (this instanceof ACTION_INDEX[typeList[i]]) {
			// 		this._type = parseInt(typeList[i]);
			// 		return;
			// 	}
			// }
		}
		/**
		 * 做一些默认的初始化操作，之后交由子类的onCreator方法自己完成
		 * @param battle action所属的battle
		 * @param args 传给子类的arg
		 */
		public void initialize(Battle battle, object args)
		{
			this.creator = (args && args.creator) || battle;
			this.target = this.creator;
			this.battle = battle;
			this.trigger = this.battle.trigger;
			this.GAM = this.battle.actionManager;
			this.extraData = args;
			this.target = args && args.target;
			this.onCreator(args);
		}
		/**
		 * 子类进行初始化，用于给特殊变量赋值，或者注册监听
		 * @param args 传给子类的arg
		 */
		protected void onCreator(args)
		{

		}
		public void setState(ACTION_STATE foo)
		{
			this.state = foo;
			this.trigger.notify(this);
		}
		public doTrigger()
		{
			this.setState(ACTION_STATE.TRIGGERED);
		}
		public void doDeal()
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
		protected void deal()
		{
			//
		}
		/**
		 * 主要用来生成log,用于客户端表现。
		 * 需要注意深拷贝数据,防止引用
		 */
		protected void done()
		{
			//
		}

		/**
		 * 删除数据引用，返回池中
		 */
		public void clear()
		{
			this.creator = null;
			this.target = null;
			this.battle = null;
			this.trigger = null;
			this.GAM = null;
			this.extraData = null;
			this.onDestory();
		}
		protected void onDestory()
		{

		}
	}

}