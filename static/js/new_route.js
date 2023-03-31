function validateStartPoint(startPoint) {
  const pattern = /^[a-zA-Z ]+$/;
  if (pattern.test(startPoint)) {
    document.getElementById('invalid-start-point').innerText = '';
    return true;
  }
  document.getElementById('invalid-start-point').innerText = 'Enter a starting point';
  return false;
}

function validateEndPoint(endPoint) {
  const pattern = /^[a-zA-Z ]+$/;
  if (pattern.test(endPoint)) {
    document.getElementById('invalid-end-point').innerText = '';
    return true;
  }
  document.getElementById('invalid-end-point').innerText = 'Enter a destination';
  return false;
}

// az input dropwon listabol johet, ezert legrosszabb esetben ures az input
function validateDay(day) {
  const pattern = /^[a-zA-Z]+$/;
  if (pattern.test(day)) {
    document.getElementById('invalid-day').innerText = '';
    return true;
  }
  document.getElementById('invalid-day').innerText = 'Pick a day';
  return false;
}

function validateDepartureTime(time) {
  const pattern = /^[0-9]{2}:[0-9]{2}$/;
  if (pattern.test(time)) {
    document.getElementById('invalid-time').innerText = '';
    return true;
  }
  document.getElementById('invalid-time').innerText = 'Pick a time';
  return false;
}

function validateArrivalTime(time) {
  const pattern = /^[0-9]{2}:[0-9]{2}$/;
  if (pattern.test(time)) {
    const depTime = document.getElementById('departure-time').value;
    if (time < depTime) {
      document.getElementById('invalid-arrival-time').innerText = 'Arrival time can\'t be sooner than departure time';
      return false;
    }
    document.getElementById('invalid-arrival-time').innerText = '';
    return true;
  }
  document.getElementById('invalid-arrival-time').innerText = 'Pick a time';
  return false;
}

function validatePrice(price) {
  const pattern = /^[1-9][0-9]*$/;
  if (pattern.test(price)) {
    document.getElementById('invalid-ticket-price').innerText = '';
    return true;
  }
  document.getElementById('invalid-ticket-price').innerText = 'Enter a valid price';
  return false;
}

function validateType(type) {
  const pattern = /^[a-zA-Z-]+$/;
  if (pattern.test(type)) {
    document.getElementById('invalid-train-type').innerText = '';
    return true;
  }
  document.getElementById('invalid-train-type').innerText = 'Choose a type';
  return false;
}

function validate() {
  const startPoint = document.getElementById('starting-point').value;
  const endPoint = document.getElementById('destination').value;
  const day = document.getElementById('departure-day').value;
  const departureTime = document.getElementById('departure-time').value;
  const arrivalTime = document.getElementById('arrival-time').value;
  const price = document.getElementById('ticket-price').value;
  const type = document.getElementById('train-type').value;

  const valid = [];
  valid.push(validateStartPoint(startPoint));
  valid.push(validateEndPoint(endPoint));
  valid.push(validateDay(day));
  valid.push(validateDepartureTime(departureTime));
  valid.push(validateArrivalTime(arrivalTime));
  valid.push(validatePrice(price));
  valid.push(validateType(type));

  // minden validalasnak teljesulnie kell
  return valid.every((elem) => elem === true);
}
