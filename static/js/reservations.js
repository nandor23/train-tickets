function deleteReservation(userId, routeId) {
  fetch(`/api/reservations/${userId}-${routeId}`, {
    method: 'DELETE',
  }).then(() => {
    document.getElementById(`${userId}-reservation-delete`).remove();
    document.getElementById('delete-message').innerText = 'Reservation deleted successfully';
  }).catch(() => {
    document.getElementById('delete-message').innerText = 'Couldn\'t delete reservation';
  });
}
