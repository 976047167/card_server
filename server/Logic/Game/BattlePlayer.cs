namespace Logic
{
	struct IPlayerInfo
	{
		public string uid;
	}
	class BattlePlayer : BattleObject
	{
		public BattlePlayer(Battle battle, IPlayerInfo info) : base(battle)
		{
		}
	}
}