import axios from 'axios';

const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 401) {
      onLoginFail();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
