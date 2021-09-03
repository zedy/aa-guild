// data
import TOASTR_MESSAGES from '../data/toastr-messages.data';

export class firebaseResponseSuccess {
  constructor() {
    this.responseObj = {
      status: 'success',
      payload: null,
      message: ''
    };
  }

  set status(status) {
    this.responseObj.status = status;
  }

  set message(message) {
    this.responseObj.message = TOASTR_MESSAGES[message];
  }

  set payload(payload) {
    this.responseObj.payload = payload;
  }

  get response() {
    return this.responseObj;
  }

  get status() {
    return this.responseObj.status;
  }
}

export class firebaseResponseError {
  responseObj = {
    status: 'error',
    message: TOASTR_MESSAGES.genericError
  };

  constructor(message = '') {
    if (message.length) {
      this.responseObj.message = TOASTR_MESSAGES[message];
    }
  }

  set message(message) {
    this.responseObj.message = TOASTR_MESSAGES[message];
  }

  get response() {
    return this.responseObj;
  }

  get status() {
    return this.responseObj.status;
  }
}
