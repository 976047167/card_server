using System.Collections.Generic;
namespace Logic.Card
{

	internal class CardField : BattleObject
	{
		public readonly CARD_FIELD_TYPE type;
		public readonly BattlePlayer owner;
		protected List<CardBase> cards;
		public CardField(BattlePlayer owner) : base(owner.battle)
		{
			this.cards = new List<CardBase>();
			this.owner = owner;
		}
		 /// <summary>
		 ///  洗牌
		 /// </summary>
		public void shuffle()
		{
			int i = this.cards.Count - 1;
			while (i>0)
			{
				CardBase a = this.cards[i];
				int j = this.battle.getRandom(0, i);
				this.cards[i] = this.cards[j];
				this.cards[j] = a;
				i--;
			}
		}
		/**
		 * 移动卡片至其他区域
		 * @param cards 要移动的卡片，可以是数组或单卡
		 * @param target 移动的目标
		 * @param index 移动到指定位置，可以省略，默认移动到最上方
		 */
		public void moveCardTo(int cardBId,int targetFieldId,int idx =0)
		{
			CardField target = this.battle.getObjectByBId<CardField>(targetFieldId);
			if(target == null)return;
			CardBase result = this.battle.getObjectByBId<CardBase>(cardBId);
			if(result == null)return;
			if(!this.cards.Contains(result)) return;
			this.cards.Remove(result);
			target.addCard(result,idx);
		}
		public void addCard(int cardsBid,int idx =0)
		{
			CardBase card = this.battle.getObjectByBId<CardBase>(cardsBid);
			this.addCard(card,idx);
		}
		public void addCard(CardBase card,int idx = 0)
		{
			this.cards.Insert(idx,card);
			card.setFiled(this);
		}
		public CardBase getCardByIndex(int index)
		{
			if(index>=this.cards.Count)return null;
			return this.cards[index];
		}
		public int getCardsNum()
		{
			return this.cards.Count;
		}
		// public getCardInfos()
		// {
		// 	return this.cards.map((c) =>
		// 	{
		// 		return [c.bId, c.info.cardId];
		// 	});
		// }
	}

}