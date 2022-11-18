import { orderSavingState } from "~/state/state";

export const orderSave = () => {
  orderSavingState.status = "saving";
  orderSavingState.lastActionTime = new Date();
};

export const orderSaved = () => {
  orderSavingState.status = "saved";
  orderSavingState.lastActionTime = new Date();
};

export const orderError = () => {
  orderSavingState.status = "error";
  orderSavingState.lastActionTime = new Date();
};
