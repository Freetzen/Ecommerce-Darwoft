import axios from 'axios'
import localStorageProvider from '../localStorageProvider/localStorageProvider';

const userProvider = {
  async userLogin(user) {
    try {
      const response = await axios.post("api/auth/login", user);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async userRegister(user) {
    try {
      const response = await axios.post("/api/auth/register", user);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async putUser(user) {
    try {
      const response = await axios.put("/api/auth/user", user);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async AdminPutUser(user) {
    try {
      const token = localStorageProvider.getToken()
      const response = await axios.post("/api/auth/user-admin", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async adminGetAllUsers() {
    try {
      const token = localStorageProvider.getToken()
      const response = await axios.get("/api/auth/user-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async validateUser(){
    try {
      const token = localStorageProvider.getToken()
      const response = await axios.post('/api/auth/validate', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response
    } catch (error) {
      console.log(error.message)
    }
  },

  async protectedRouteValidate(){
    try {
      const token = localStorageProvider.getToken()
      const response = await axios.get('/api/auth/validate',{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response
    } catch (error) {
      console.log(error.message)
    }
  }

}
export default userProvider;