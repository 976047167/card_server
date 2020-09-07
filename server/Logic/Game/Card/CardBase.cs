namespace Logic.Card
{

	internal abstract class CardBase : BattleObject
	{
		public string name { get; private set; }
		public CARD_TYPE type { get; private set; }
		public int fee { get; private set; }
		public CardField field { get; private set; }
		public BattlePlayer controller { get; private set; }
		public readonly BattlePlayer owner;
		public ICardData info;
		public readonly int cardId;
		internal CardBase(ICardData data, BattlePlayer owner) : base(owner.battle)
		{
			this.owner = owner;
			this.controller = this.owner;
			this.cardId = data.cardId;
			this.initData(data);
			this.initEffect();
		}
		/**
		 * 加载卡片信息
		 * @param info 卡片信息，通常只要一个id，通过读表获取其他信息。如果传入其他属性，会覆盖默认属性
		 */
		protected void initData(ICardData info)
		{
			this.info = info;
			this.fee = 2; // 费用
		}
		internal void setFiled(CardField field)
		{
			this.field = field;
		}
		public void moveTo(int fieldId)
		{

			CardField field = this.battle.getObjectByBId<CardField>(fieldId);
			if (field==null)return;
			this.field.moveCardTo(this.bId,fieldId);

		}
		protected abstract void initEffect();

	}

}