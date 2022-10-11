const loginRequired = ["deposit", "withdraw"];

const validateLogin = (users, header, ctxUser) => {
  if (loginRequired.includes(header.toLowerCase())) {
    ctxUser = users.filter(user => user.loggedIn === true)[0];
    if (ctxUser === undefined || ctxUser === []){
      return false;
    } else {
      return ctxUser;
    }
  }
  return true;
}

const frmValidate = (formErrors, field, label) => {
  let error = {};
  if (field !== undefined) {
    if (!field.toString()) {
      error[`${label}`] = `${label} CANNOT BE EMPTY`;
      //setTimeout(() => setStatus(''),3000);
    } else {
      switch (label) {
        case "password":
          if (field.length < 8) error[`${label}`] = `password must be at least 8 characters`;
          break;
        case "email":
          if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(field) === false) //eslint-disable-line
            error[`${label}`] = `email is not valid`;
          break;
        case "transaction":
          if (parseFloat(field) < 0) error[`${label}`] = `AMOUNT CANNOT BE NEGATIVE`;
          if (parseFloat(field) === 0) error[`${label}`] = `AMOUNT CANNOT BE $0.00`;
          if (isNaN(field)) error[`${label}`] = `AMOUNT MUST BE A NUMBER`;
          break;
        default:
      }
    }
  }
  formErrors = {...formErrors, ...error};
  return formErrors;
}

const frmOnChange = (e, frmInputs, tmpFrmData) => {
  let tmpSubmit = false;
  tmpFrmData[e.target.name] = e.target.value;
  frmInputs.map((frmInput) => {
    if (tmpFrmData[frmInput] === undefined) {
      tmpSubmit = true;
    } else {
      if (tmpFrmData[frmInput].length <= 0) tmpSubmit = true;
    }
  });
  return tmpSubmit;
}

export { validateLogin, frmValidate, frmOnChange }