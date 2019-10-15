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
