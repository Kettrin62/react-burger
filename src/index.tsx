import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import { socketMiddleware } from './services/middleware/socket-middleware';
import { 
  WS_CONNECTION_CLOSED, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_FINISH, 
  WS_CONNECTION_START, 
  WS_CONNECTION_START_INIT, 
  WS_CONNECTION_SUCCESS, 
  WS_GET_MESSAGE, 
  WS_SEND_MESSAGE 
} from './services/actions/ws';

declare const window: any;

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  ws: WS_CONNECTION_START,
  wsInit: WS_CONNECTION_START_INIT,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsClose: WS_CONNECTION_FINISH
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
