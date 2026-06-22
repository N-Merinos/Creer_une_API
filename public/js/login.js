document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Empêche le rechargement de la page

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  try {
    // On envoie les identifiants à l'API
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // On sauvegarde le token dans le localStorage
      localStorage.setItem('token', data.token);
      // On redirige vers le tableau de bord
      window.location.href = '/dashboard.html';
    } else {
      errorMessage.textContent = data.message || 'Erreur de connexion';
    }
  } catch (error) {
    errorMessage.textContent = 'Erreur serveur, veuillez réessayer';
  }
});