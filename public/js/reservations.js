// Vérifie si l'utilisateur est connecté
const token = localStorage.getItem('token');
if (!token) window.location.href = '/index.html';

// Charge toutes les réservations de tous les catways
const loadReservations = async () => {
  const tbody = document.getElementById('reservationsBody');
  tbody.innerHTML = '';

  // On récupère d'abord tous les catways
  const catwaysResponse = await fetch('https://port-russel-2m8c.onrender.com/catways', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const catways = await catwaysResponse.json();

  // Pour chaque catway on récupère ses réservations
  for (const catway of catways) {
    const resResponse = await fetch(`https://port-russel-2m8c.onrender.com/catways/${catway.catwayNumber}/reservations`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const reservations = await resResponse.json();

    reservations.forEach(r => {
      tbody.innerHTML += `
        <tr>
          <td>${r.catwayNumber}</td>
          <td>${r.clientName}</td>
          <td>${r.boatName}</td>
          <td>${new Date(r.startDate).toLocaleDateString('fr-FR')}</td>
          <td>${new Date(r.endDate).toLocaleDateString('fr-FR')}</td>
          <td>
            <button onclick="deleteReservation(${r.catwayNumber}, '${r._id}')">Supprimer</button>
          </td>
        </tr>
      `;
    });
  }
};

// Ajouter une réservation
document.getElementById('reservationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = document.getElementById('reservationMessage');
  const catwayNumber = document.getElementById('catwayNumber').value;

  const response = await fetch(`https://port-russel-2m8c.onrender.com/catways/${catwayNumber}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      clientName: document.getElementById('clientName').value,
      boatName: document.getElementById('boatName').value,
      startDate: document.getElementById('startDate').value,
      endDate: document.getElementById('endDate').value
    })
  });

  const data = await response.json();
  message.textContent = data.message;
  loadReservations();
});

// Supprimer une réservation
const deleteReservation = async (catwayNumber, reservationId) => {
  if (!confirm('Confirmer la suppression ?')) return;

  await fetch(`https://port-russel-2m8c.onrender.com/catways/${catwayNumber}/reservations/${reservationId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  loadReservations();
};

// Déconnexion
document.getElementById('logoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  await fetch('https://port-russel-2m8c.onrender.com/logout');
  localStorage.removeItem('token');
  window.location.href = '/index.html';
});

loadReservations();