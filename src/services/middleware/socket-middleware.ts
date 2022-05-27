import { Middleware, MiddlewareAPI } from 'redux';
import { IWsActions } from '../store';
import { AppDispatch } from '../types';
import { RootState } from '../types';

export const socketMiddleware = (
  wsUrl: string,
  wsActions: IWsActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { ws, wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, onMessageInit , wsClose } = wsActions;
      const { token } = getState().user;
      if (type === ws) {
        socket = new WebSocket(`${wsUrl}/all`);

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

      }
      if (type === wsInit && token) {
        socket = new WebSocket(`${wsUrl}?token=${token.split('Bearer ')[1]}`);

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessageInit, payload: restParsedData });
        };

      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: token };
          socket.send(JSON.stringify(message));
        }

        if (type === wsClose) {
          socket.close(1000, 'Закрытие cоединения')
        }
      }

      next(action);
    };
  };
};