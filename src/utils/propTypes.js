import TYPES from "prop-types";

export const TYPE_FORMATION = TYPES.objectOf(
  TYPES.shape({
    troop: TYPES.string,
    level: TYPES.string,
  })
).isRequired;
