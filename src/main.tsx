import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {Provider} from 'react-redux';

import {BrowserRouter as Router} from 'react-router-dom';
import {store} from './store/index.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
