export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { ws, wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsClose } = wsActions;
      const { token } = getState().user;
      if (type === ws) {
        socket = new WebSocket(`${wsUrl}/all`);
      }
      if (type === wsInit && token) {
        socket = new WebSocket(`${wsUrl}?token=${token.split('Bearer ')[1]}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: token };
                    // функция для отправки сообщения на сервер
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