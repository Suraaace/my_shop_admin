import axios from "axios";

export const authToken = () => {
  let token = localStorage.getItem('auth_token');
  return {Authorization: "Bearer "+ token};
};

export const isBackendLogin = async () => {
  let isUserLogin = false;

  let authToken = localStorage.getItem('auth_token');
  let response  = await axios.get(process.env.REACT_APP_API_HOST_URL+'/auth/validate/jwt',  {
                    params: {
                      token: authToken,
                    }
                  })
                      .then((res) => {
                        return res.data
                      })
                      .catch(err => err);

  if(response.success === true) {
    isUserLogin = true;
  }

  return isUserLogin;

};