
static class Settings
{
	public static int ORIGIN_HAND = 4;
}

enum COMMAND_ID
{
	USE_HAND_CARD = 1,
	TURN_END = 2,
}

enum BATTLE_STATE
{
	END = 0,
	GAMING = 1
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