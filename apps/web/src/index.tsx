import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './i18n';

// TODO: move this to somewhere where we have access to router and apollo client
/* const refreshToken = () => {
  const token = localStorage.getItem('xt');
  if (!token) return;
  console.log('Refreshing token');
  fetch('http://localhost:4000/refresh_token', { method: 'POST', credentials: 'include' })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.ok) localStorage.setItem('xt', data.accessToken);
    });
};

// every ms * s * m, refresh the token
setInterval(refreshToken, 1000 * 60 * 10); */

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
