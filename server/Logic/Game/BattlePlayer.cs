namespace Logic
{
	using Action;
	internal class BattlePlayer : BattleObject
	{
		public readonly string uid;
		public readonly AttributeManager attribute;
		public readonly PlayerInfo playerInfo;
		// private CardFieldBase deck;
		// private CardFieldBase removed;
		// private CardFieldBase hand;
		// private CardFieldBase dealing;
		// private BuffBase[] buffList;

		public BattlePlayer(Battle battle, PlayerInfo info) : base(battle)
		{
			this.playerInfo = info;
			this.uid = info.uid;
			this.attribute = new AttributeManager();

		}
		public void gameStart()
		{

		}
		/// <summary>
		/// 行动结束
		/// </summary>
		public void turnEnd()
		{
			AcitonArg a;
			a.creator = this.bId;
			a.target = 0;
			this.GAM.pushAction(ACTION_TYPE.TURN_END, a);
		}
		public void turnBegin()
		{
			System.Console.WriteLine("Player:{1} turn begins!", this.uid);
			AcitonArg a;
			a.creator = this.bId;
			a.target = 0;
			this.GAM.pushAction(ACTION_TYPE.TURN_BEGIN, a);
		}

	}
}