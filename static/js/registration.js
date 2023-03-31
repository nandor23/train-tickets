function validateUsername(username) {
  const pattern = /^[a-zA-Z\d]{6,16}$/;
  if (pattern.test(username)) {
    // annak ellenorzese, ha letezik a felhasznalonev
    fetch(`/api/users/${username}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          document.getElementById('invalid-username').innerText = 'Username already exists';
        } else {
          document.getElementById('invalid-username').innerText = '';
        }
      });
    return true;
  }
  if (username.length < 6) {
    document.getElementById('invalid-username').innerText = 'Username must be at least 6 characters long';
  } else if (username.length > 16) {
    document.getElementById('invalid-username').innerText = 'Username can\'t be longer than 16 characters';
  } else {
    document.getElementById('invalid-username').innerText = 'Enter your username';
  }
  return false;
}

function validatePassword(password) {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?&*])([\da-zA-Z!@#$%?&*]{8,26})$/;
  if (pattern.test(password)) {
    document.getElementById('invalid-password').innerText = '';
    return true;
  }
  if (password.length < 8) {
    document.getElementById('invalid-password').innerText = 'Password must be at least 8 characters long';
  } else if (password.length > 26) {
    document.getElementById('invalid-password').innerText = 'Password can\'t be longer than 26 characters';
  } else {
    document.getElementById('invalid-password').innerText = 'Please choose a stronger password. Try a mix of letters, numbers, and symbols.';
  }
  return false;
}

function validateConfirmPassword(passwordAgain) {
  const password = document.getElementById('password').value;
  console.log(password);
  if (passwordAgain === password && password !== '') {
    document.getElementById('invalid-confirm-password').innerText = '';
    return true;
  }
  if (passwordAgain.length < 8) {
    document.getElementById('invalid-confirm-password').innerText = 'Password must be at least 8 characters long';
  } else if (passwordAgain.length > 26) {
    document.getElementById('invalid-confirm-password').innerText = 'Password can\'t be longer than 26 characters';
  } else {
    document.getElementById('invalid-confirm-password').innerText = 'The passwords you entered do not match.';
  }
  return false;
}

function validate() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const passwordAgain = document.getElementById('confirm-password').value;

  const valid = [];
  valid.push(validateUsername(username));
  valid.push(validatePassword(password));
  valid.push(validateConfirmPassword(passwordAgain));
  return valid.every((elem) => elem === true);
}
