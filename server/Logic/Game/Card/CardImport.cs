
namespace Logic.Card
{
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
		public int level;
	}
	public enum CARD_TYPE
	{
		NORMAL,
		COUNTER, // 反击卡
		EQUIP, // 装备卡
		PROFESSION, // 法术专业卡
	}
}