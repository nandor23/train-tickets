function correctMinPrice() {
  const minPrice = document.getElementById('min-price').value;
  if (minPrice === '') {
    return;
  }
  if (minPrice === '0') {
    document.getElementById('min-price').value = '';
    return;
  }

  const maxPrice = document.getElementById('max-price').value;
  if (maxPrice === '') {
    return;
  }
  if (minPrice > maxPrice) {
    document.getElementById('max-price').value = minPrice;
  }
}

function correctMaxPrice() {
  const maxPrice = document.getElementById('max-price').value;
  if (maxPrice === '') {
    return;
  }
  if (maxPrice === '0') {
    document.getElementById('max-price').value = '';
    return;
  }

  const minPrice = document.getElementById('min-price').value;
  if (minPrice === '') {
    return;
  }
  if (maxPrice < minPrice) {
    document.getElementById('min-price').value = maxPrice;
  }
}

function elapsedTime(departureTime, arrivalTime) {
  const travelTime = { hour: 0, minute: 0 };
  const depTime = departureTime.split(':').map(Number);
  const arrTime = arrivalTime.split(':').map(Number);
  travelTime.hour += arrTime[0] - depTime[0];
  travelTime.minute += arrTime[1] - depTime[1];
  if (travelTime.minute < 0) {
    travelTime.hour -= 1;
    travelTime.minute += 60;
  }
  return travelTime;
}

function showDetails(stringOfIds, id) {
  const row = document.getElementById(`${id}-details`);
  if (row.style.display === 'table-cell') {
    row.style.display = 'none';
    document.getElementById(id).style.borderBottomColor = 'inherit';
  } else {
    row.style.display = 'table-cell';
    document.getElementById(id).style.borderBottomColor = 'transparent';
  }
  let i = 1;
  const idArray = JSON.parse(stringOfIds);
  Promise.all(idArray.map((routeId) => fetch(`/api/routes/${routeId}`)
    .then((response) => response.json())
    .then((route) => {
      if (row.style.display === 'table-cell') {
        document.getElementById(`${id}-${i}-departure-time`).innerText = route.departureTime;
        document.getElementById(`${id}-${i}-arrival-time`).innerText = route.arrivalTime;
        document.getElementById(`${id}-${i}-departure-place`).innerText = route.startingPoint;
        document.getElementById(`${id}-${i}-arrival-place`).innerText = route.destination;
        document.getElementById(`${id}-${i}-route-id`).textContent = route.routeId;
        document.getElementById(`${id}-${i}-train-type`).textContent = route.trainType;
        const travelTime = elapsedTime(route.departureTime, route.arrivalTime);
        document.getElementById(`${id}-${i}-elapsed-time`).innerText = `${travelTime.hour} hour ${travelTime.minute} minute travel time`;
      } else {
        document.getElementById(`${id}-${i}-departure-time`).innerText = '';
        document.getElementById(`${id}-${i}-arrival-time`).innerText = '';
        document.getElementById(`${id}-${i}-departure-place`).innerText = '';
        document.getElementById(`${id}-${i}-departure-place`).innerText = '';
        document.getElementById(`${id}-${i}-route-id`).textContent = '';
        document.getElementById(`${id}-${i}-train-type`).textContent = '';
        document.getElementById(`${id}-${i}-elapsed-time`).innerText = '';
      }
      i += 1;
    })));
}

function showSingleDetail(routeId, id) {
  const row = document.getElementById(`${id}-details`);
  if (row.style.display === 'table-cell') {
    row.style.display = 'none';
    document.getElementById(id).style.borderBottomColor = 'inherit';
  } else {
    row.style.display = 'table-cell';
    document.getElementById(id).style.borderBottomColor = 'transparent';
  }
  let i = 1;
  routeId = JSON.parse(routeId)

  const fetchData = async () => await fetch(`/api/routes/${routeId}`)
    .then((response) => response.json())
    .then((route) => {
      if (row.style.display === 'table-cell') {
        document.getElementById(`${id}-departure-time`).innerText = route.departureTime;
        document.getElementById(`${id}-arrival-time`).innerText = route.arrivalTime;
        document.getElementById(`${id}-departure-place`).innerText = route.startingPoint;
        document.getElementById(`${id}-arrival-place`).innerText = route.destination;
        document.getElementById(`${id}-route-id`).textContent = route.routeId;
        document.getElementById(`${id}-train-type`).textContent = route.trainType;
        const travelTime = elapsedTime(route.departureTime, route.arrivalTime);
        document.getElementById(`${id}-elapsed-time`).innerText = `${travelTime.hour} hour ${travelTime.minute} minute travel time`;
      } else {
        document.getElementById(`${id}-departure-time`).innerText = '';
        document.getElementById(`${id}-arrival-time`).innerText = '';
        document.getElementById(`${id}-departure-place`).innerText = '';
        document.getElementById(`${id}-departure-place`).innerText = '';
        document.getElementById(`${id}-route-id`).textContent = '';
        document.getElementById(`${id}-train-type`).textContent = '';
        document.getElementById(`${id}-elapsed-time`).innerText = '';
      }
    });
  fetchData();
}

function buyTickets(stringOfIds, userId, elemId) {
  const element = document.getElementById(elemId);
  const idArray = JSON.parse(stringOfIds);

  if (element.className === "buy-ticket") {
    idArray.forEach((routeId) => {
      fetch(`/api/reservations/${userId}-${routeId}`, {
        method: 'POST',
      });
    });
    element.className = "refund-ticket";
    element.innerText = "Refund";
  } else {
    idArray.forEach((routeId) => {
      fetch(`/api/reservations/${userId}-${routeId}`, {
        method: 'DELETE',
      });
    });
    element.className = "buy-ticket";
    element.innerText = "Buy ticket";
  }
}

function deleteSingleTicket(routeId, userId, elemId) {
  document.getElementById(elemId).remove();
  document.getElementById(`${elemId}-info`).remove();
  routeId = JSON.parse(routeId);

  fetch(`/api/reservations/${userId}-${routeId}`, {
    method: 'DELETE',
  });
}
