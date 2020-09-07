
namespace Logic.Card
{
	using Action;
	enum CARD_FIELD_TYPE {
	DECK ,
	HAND  ,
	GRAVE ,
	REMOVED ,
	DEALING ,
}
	public struct ICardData
	{
		public int cardId;
		public int exp;
	}
	public struct CardModel{
		public int cardId;
		public int expPerLevel;
		public string name;
		public CARD_TYPE tYPE;
		public CardEffect[] effects;
	}
	public struct CardEffect{
		ACTION_TYPE a;
		ACTION_STATE s;
		TARGET_TYPE t;

	}
	public enum TARGET_TYPE{
		SELF,


	}
	public enum CARD_TYPE
	{
		NORMAL,
		COUNTER, // 反击卡
		EQUIP, // 装备卡
		PROFESSION, // 法术专业卡
	}
}