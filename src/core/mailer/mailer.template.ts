export function welcomeTemplate(params: { username: string }) {
  const { username } = params;

  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.4;">
    <h2>Bienvenue ${username} 👋</h2>
    <p>Ton compte a bien été créé sur <b>CESAR</b>.</p>
    <p>À bientôt !</p>
  </div>
  `;
}
