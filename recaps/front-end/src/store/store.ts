import { fork } from "@redux-saga/core/effects";
export default function* rootSaga() {
  try {
    yield fork();
  } catch (error) {
    console.log(error);
  }
}
