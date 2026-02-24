export function welcomeMailTemplate(username: string) {
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.4">
    <h2>Bienvenue ${username} </h2>
    <p>Ton compte a bien été créé sur <b>Cesar</b>.</p>
    <p>Tu peux maintenant te connecter.</p>
    <hr />
    <small>Mail automatique - ne pas répondre.</small>
  </div>
  `;
}