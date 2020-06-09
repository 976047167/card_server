export enum ACTION_TYPE {
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

export const enum COMMAND_ID {
    USE_HAND_CARD = 1,
    TURN_END = 2,
}
export const SETTINGS = {
    ORIGIN_HAND: 4,
};
