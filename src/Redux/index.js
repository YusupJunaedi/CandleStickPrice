import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rpm from "redux-promise-middleware";

import indexReducer from './Reducers';

const enhancers = applyMiddleware(rpm, logger);

const storeRedux = createStore(indexReducer, enhancers);

export default storeRedux;
