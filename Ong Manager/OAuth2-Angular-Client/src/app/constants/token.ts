const tokenUrl = (code: string) => {
  const redirectUri = 'http://localhost:4200/authorized';
  return `http://localhost:8080/oauth2/token?client_id=client&redirect_uri=${redirectUri}&grant_type=authorization_code&code=${code}`;
}

export default tokenUrl
