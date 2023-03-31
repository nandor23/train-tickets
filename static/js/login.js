function validateUsername(name) {
  const pattern = /^[a-zA-Z\d]{6,16}$/;
  if (pattern.test(name)) {
    document.getElementById('invalid-username').innerText = '';
    return true;
  }
  if (name.length < 6) {
    document.getElementById('invalid-username').innerText = 'Username must be at least 6 characters long';
  } else if (name.length > 16) {
    document.getElementById('invalid-username').innerText = 'Username can\'t be longer than 16 characters';
  } else {
    document.getElementById('invalid-username').innerText = 'Enter your username';
  }
  return false;
}

function validatePassword(password) {
  const pattern = /^[\da-zA-Z!@#$%?&*]{8,26}$/;
  if (pattern.test(password)) {
    document.getElementById('invalid-password').innerText = '';
    return true;
  }
  if (password.length < 8) {
    document.getElementById('invalid-password').innerText = 'Password must be at least 8 characters long';
  } else if (password.length > 26) {
    document.getElementById('invalid-password').innerText = 'Password can\'t be longer than 26 characters';
  }
  return false;
}

function validate() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const valid = [];
  valid.push(validateUsername(username));
  valid.push(validatePassword(password));
  return valid.every((elem) => elem === true);
}
