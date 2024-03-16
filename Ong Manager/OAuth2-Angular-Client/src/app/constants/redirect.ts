const redirectUrl = () => {
  const redirectUri = 'http://localhost:4200/authorized';
  return `http://localhost:8080/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=${redirectUri}`;
}

export default redirectUrl;
