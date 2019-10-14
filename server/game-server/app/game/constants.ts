/**
 *  时点 TimePoint 以下统称（TP）
 *  触发时点，命名前缀为触发对象
 */
export enum TIME_POINT {
    CARD_HAND = 0, // 手牌中直接使用
    CARD_DAMAGE, // 卡牌被伤害结算送入墓地时
    PLAYER_TURN_BEGIN, // 玩家回合开始时
    PLAYER_DRAW_CARD, // 玩家抽卡时
    ACTION_COUNTER, // 某种行为发动，但未生效时
}

export enum ACTION_TYPE {
    MOVE_CARD,
    DRAW_CARD,
    DAMAGE,
    DAMAGE_SETTLE,
    CARD_EFFECT,
    USE_HAND_CARD,
    TURN_BEGIN,
    SHUFFLE,
}

export enum COMMAND_ID {
    USE_HAND_CARD,
}
export const SETTINGS = {
    ORIGIN_HAND : 4,
};
