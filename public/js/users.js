// Vérifie si l'utilisateur est connecté
const token = localStorage.getItem('token');
if (!token) window.location.href = '/index.html';

// Charge la liste des utilisateurs
const loadUsers = async () => {
  const response = await fetch('https://port-russel-2m8c.onrender.com/users', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const users = await response.json();
  const tbody = document.getElementById('usersBody');
  tbody.innerHTML = '';

  users.forEach(user => {
    tbody.innerHTML += `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="deleteUser('${user.email}')">Supprimer</button>
          <button onclick="editUser('${user.email}', '${user.username}')">Modifier</button>
        </td>
      </tr>
    `;
  });
};

// Ajouter un utilisateur
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = document.getElementById('userMessage');

  const response = await fetch('https://port-russel-2m8c.onrender.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  });

  const data = await response.json();
  message.textContent = data.message;
  loadUsers();
});

// Supprimer un utilisateur
const deleteUser = async (email) => {
  if (!confirm('Confirmer la suppression ?')) return;

  await fetch(`https://port-russel-2m8c.onrender.com/users/${email}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  loadUsers();
};

// Modifier un utilisateur
const editUser = async (email, currentUsername) => {
  const newUsername = prompt('Nouveau nom d\'utilisateur :', currentUsername);
  if (!newUsername) return;

  await fetch(`https://port-russel-2m8c.onrender.com/users/${email}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ username: newUsername })
  });
  loadUsers();
};

// Déconnexion
document.getElementById('logoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  await fetch('https://port-russel-2m8c.onrender.com/logout');
  localStorage.removeItem('token');
  window.location.href = '/index.html';
});

loadUsers();