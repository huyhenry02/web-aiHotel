import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { store } from '../redux/store';
import { get, toNumber } from 'lodash';

const initPusher = () => {
  return new Pusher('app-key', {
    wsHost: process.env.REACT_APP_WS_URL,
    wsPort: toNumber(process.env.REACT_APP_WS_PORT) || 6001,
    cluster: 'mt1',
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
  });
};

const initEcho = () => {
  const state = store.getState();
  const authToken = get(state, 'auth.token');

  return new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_WS_KEY,
    wsHost: process.env.REACT_APP_WS_URL,
    wsPort: process.env.REACT_APP_WS_PORT,
    forceTLS: false,
    encrypted: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `${process.env.REACT_APP_URL_API}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json',
      },
    },
  });
};

export { initEcho, initPusher };
