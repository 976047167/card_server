using System.Collections.Generic;
namespace Logic.Action
{

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
		internal enum ACTION_STATE
		{
			UNTRIGGERED, // action还没有触发
			TRIGGERED,  //触发但没有起效
			WORKING,//起效中
			REJECTED,//被否决
			COMPLETED,//触发完成
		}


}