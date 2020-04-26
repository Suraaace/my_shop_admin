export const authToken = () => {
  let token = localStorage.getItem('auth_token');
  return {Authorization: "Bearer "+ token};
};