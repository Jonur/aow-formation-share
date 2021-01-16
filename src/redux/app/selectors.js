import { createSelector } from "reselect";

export const getApp = ({ app }) => app;

export const getUserInteractions = createSelector(
  getApp,
  ({ userInteractions }) => userInteractions
);

export const getLastTroopAdded = createSelector(
  getUserInteractions,
  ({ lastTroopAdded }) => lastTroopAdded
);

export const getSelectedSquared = createSelector(
  getUserInteractions,
  ({ selectedSquare }) => selectedSquare
);

export const getTroopSelectionFormStatus = createSelector(
  getUserInteractions,
  ({ troopSelectionFormStatus }) => troopSelectionFormStatus
);
