// libs
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { PersistGate } from 'redux-persist/integration/react';

// components
import App from './components/app/App';

// redux
import { store, persistor } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
    <ReduxToastr
      timeOut={3000}
      newestOnTop={false}
      preventDuplicates
      getState={state => state.toastr} // This is the default
      transitionIn='fadeIn'
      transitionOut='fadeOut'
      progressBar
      closeOnToastrClick
    />
  </Provider>,
  document.getElementById('root')
);
