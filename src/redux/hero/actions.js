export const UPDATE_HERO = "UPDATE_HERO";

export const updateHero = ({ id, level, stars }) => ({
  type: UPDATE_HERO,
  payload: { id, level, stars },
});
