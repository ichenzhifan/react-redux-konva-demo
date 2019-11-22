/**
 * Created by Administrator on 2016/9/14.
 */
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

/**
 * 用于创建一个store
 * @param {Object} initialState 初始值.
 */
export default function configStore(rootReducer) {
  const initialState = {};
  const middlewares = [thunk];
  const appliedMiddlewares = middlewares.map(m => applyMiddleware(m));

  let composeEnhancers = compose;

  if (__DEVELOPMENT__) {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const finalCreateStore = composeEnhancers(...appliedMiddlewares)(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  return store;
}
