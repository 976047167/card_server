
static class Settings
{
	public static int ORIGIN_HAND = 4;
}

enum COMMAND_ID
{
	USE_HAND_CARD = 1,
	TURN_END = 2,
}
enum ACTION_TYPE
{
	MOVE_CARD = 1,
	DRAW_CARD = 2,
	DAMAGE = 3,
	DAMAGE_SETTLE = 4,
	CARD_EFFECT = 5,
	USE_HAND_CARD = 6,
	TURN_BEGIN = 7,
	SHUFFLE = 8,
	TURN_END = 9,
}


enum BATTLE_STATE
{
	END = 0,
	GAMING = 1
}
enum ACTION_STATE {
	UNTRIGGERED, // action还没有触发
	TRIGGERED,
	WORKING,
	REJECTED,
	COMPLETED,
}
enum TRIGGER_PRIORITY {
	LOW,
	NORMAL,
	HIGH,
}
// export interface IAttribute {
// 	str: number;
// 	agi: number;
// 	spi: number;
// 	sta: number;
// 	int: number;
// 	per: number;
// 	derive?: {
// 		initiative: number;
// 		immunity: number;
// 		tenacious: number;
// 		[others: string]: number;
// 	};
// }
// agi: info.attribute.agile,
// int: info.attribute.intellect,
// per: info.attribute.perception,
// spi: info.attribute.spirit,
// sta: info.attribute.stamina,
// str: info.attribute.strength,