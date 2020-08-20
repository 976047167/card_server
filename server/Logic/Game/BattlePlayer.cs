namespace Logic
{
	using Action;
	class BattlePlayer : BattleObject
	{
		public readonly string uid;
		public readonly AttributeManager attribute;
		public readonly PlayerInfo playerInfo;
		private CardFieldBase deck;
		private CardFieldBase removed;
		private CardFieldBase hand;
		private CardFieldBase dealing;
		private BuffBase[] buffList;
		public BattlePlayer(Battle battle, PlayerInfo info) : base(battle)
		{
			this.playerInfo = info;
			this.uid = info.uid;

		}
		/**
 * 行动结束
 */
		public void turnEnd()
		{
			this.GAM.pushAction(ACTION_TYPE.TURN_END);
		}
		public void turnBegin()
		{
			System.Console.WriteLine("{1} turn begins",this.uid);
			this.GAM.pushAction(ACTION_TYPE.TURN_BEGIN);
		}

	}
}