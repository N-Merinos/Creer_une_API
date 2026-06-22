// Vérifie si l'utilisateur est connecté
const token = localStorage.getItem('token');
if (!token) window.location.href = '/index.html';

// Charge la liste des catways
const loadCatways = async () => {
  const response = await fetch('http://localhost:3000/catways', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const catways = await response.json();
  const tbody = document.getElementById('catwaysBody');
  tbody.innerHTML = '';

  catways.forEach(catway => {
    tbody.innerHTML += `
      <tr>
        <td>${catway.catwayNumber}</td>
        <td>${catway.catwayType}</td>
        <td>${catway.catwayState}</td>
        <td>
          <button onclick="deleteCatway(${catway.catwayNumber})">Supprimer</button>
          <button onclick="editCatway(${catway.catwayNumber}, '${catway.catwayState}')">Modifier</button>
        </td>
      </tr>
    `;
  });
};

// Ajouter un catway
document.getElementById('catwayForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = document.getElementById('catwayMessage');

  const response = await fetch('http://localhost:3000/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      catwayNumber: document.getElementById('catwayNumber').value,
      catwayType: document.getElementById('catwayType').value,
      catwayState: document.getElementById('catwayState').value
    })
  });

  const data = await response.json();
  message.textContent = data.message;
  loadCatways();
});

// Supprimer un catway
const deleteCatway = async (id) => {
  if (!confirm('Confirmer la suppression ?')) return;

  await fetch(`http://localhost:3000/catways/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  loadCatways();
};

// Modifier l'état d'un catway
const editCatway = async (id, currentState) => {
  const newState = prompt('Nouvel état du catway :', currentState);
  if (!newState) return;

  await fetch(`http://localhost:3000/catways/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ catwayState: newState })
  });
  loadCatways();
};

// Déconnexion
document.getElementById('logoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  await fetch('http://localhost:3000/logout');
  localStorage.removeItem('token');
  window.location.href = '/index.html';
});

loadCatways();