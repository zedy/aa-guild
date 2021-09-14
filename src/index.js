// libs
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

// components
import App from './App';

// redux
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
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
