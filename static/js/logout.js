async function logout() {
  await fetch('/logout', { method: 'POST' });
  window.location = '/';
}
