import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducer';
import createStore from './redux/store';
import app from './components/App';

const store = createStore(rootReducer);
const App = hot(app);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
