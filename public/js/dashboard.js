// Vérifie si l'utilisateur est connecté
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/index.html';
}

// Décode le token pour récupérer les infos utilisateur
const payload = JSON.parse(atob(token.split('.')[1]));
document.getElementById('username').textContent = payload.email;
document.getElementById('userEmail').textContent = payload.email;

// Affiche la date du jour
const today = new Date();
document.getElementById('currentDate').textContent = today.toLocaleDateString('fr-FR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Récupère les réservations en cours
const loadReservations = async () => {
  try {
    const response = await fetch('https://port-russel-2m8c.onrender.com/catways', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const catways = await response.json();

    const today = new Date();
    const tbody = document.getElementById('reservationsBody');
    tbody.innerHTML = '';

    // Pour chaque catway on récupère ses réservations
    for (const catway of catways) {
      const resResponse = await fetch(`https://port-russel-2m8c.onrender.com/catways/${catway.catwayNumber}/reservations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const reservations = await resResponse.json();

      // On filtre les réservations en cours
      const current = reservations.filter(r => 
        new Date(r.startDate) <= today && new Date(r.endDate) >= today
      );

      current.forEach(r => {
        tbody.innerHTML += `
          <tr>
            <td>${r.catwayNumber}</td>
            <td>${r.clientName}</td>
            <td>${r.boatName}</td>
            <td>${new Date(r.startDate).toLocaleDateString('fr-FR')}</td>
            <td>${new Date(r.endDate).toLocaleDateString('fr-FR')}</td>
          </tr>
        `;
      });
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Déconnexion
document.getElementById('logoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  await fetch('https://port-russel-2m8c.onrender.com/logout');
  localStorage.removeItem('token');
  window.location.href = '/index.html';
});

loadReservations();