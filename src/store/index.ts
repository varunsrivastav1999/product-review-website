import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from "./reducers";
import {rootSaga} from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);

const reduxStore = createStore(
    rootReducer,
    {},
    composeWithDevTools(middlewares)
);


sagaMiddleware.run(rootSaga);

export default reduxStore;
