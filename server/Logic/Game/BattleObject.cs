namespace Logic
{

	/**
	 * 场景中所有物体的基类
	 * 衍生类有buff，card，player等
	 */
	abstract class BattleObject
	{
		public readonly int bId;
		public readonly Battle battle;
		public readonly GameActionManager GAM;
		protected readonly Trigger trigger;
		public BattleObject(Battle battle)
		{
			this.battle = battle;
			this.trigger = battle.trigger;
			this.GAM = battle.actionManager;
			this.bId = this.battle.registerBOJ(this);
		}
	}

}