import  {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import localStorageProvider from '../utils/localStorageProvider/localStorageProvider';
import userProvider from '../utils/userProvider/userProvider';
import Swal from 'sweetalert2';
import ticketsProvider from '../utils/ticketsProvider/ticketsProvider';

export const registerAsync = createAsyncThunk(
    "auth/registerAsync",
    async (credentials) => {
      const loginUser = await userProvider.userRegister(credentials);
      if (loginUser.success){
          localStorageProvider.setToken(loginUser.token)
          return loginUser
      }

      return Swal.fire({
        position: "center",
        icon: "error",
        title: `${loginUser.message}`,
        showConfirmButton: false,
        timer: 1200,
      });
    }
);

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials) => {
    const loginUser = await userProvider.userLogin(credentials);
    if (loginUser.success){
        localStorageProvider.setToken(loginUser.token)
        return loginUser
    }

    return Swal.fire({
      position: "center",
      icon: "error",
      title: `${loginUser.message}`,
      showConfirmButton: false,
      timer: 1200,
    });
  }
);

export const validateLoginAsync = createAsyncThunk(
  "auth/validateLoginAsync",
  async () => {
    const response = await userProvider.validateUser()
    if(response.message === 'jwt expired') return response
    return response.data
  }
);

export const userPurchaseAsync = createAsyncThunk(
  "auth/userPurchaseAsync",
  async (id) => {
    const response = await ticketsProvider.getTicketUser(id)
    return response.data
  }
);

export const userUpdateAdmin = createAsyncThunk(
  "auth/userUpdateAdmin",
  async (user) => {
    const response = await userProvider.AdminPutUser(user)
    if(response.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${response.message}`,
        showConfirmButton: false,
        timer: 1200,
      });
      return response
    }

    return Swal.fire({
      position: "center",
      icon: "error",
      title: `${response.message}`,
      showConfirmButton: false,
      timer: 1000,
    });
  }
);

export const adminOrUser = createAsyncThunk(
  "auth/adminOrUser",
  async (token) => { // Acepta el token como argumento
    const response = await userProvider.protectedRouteValidate(token); // Pasa el token a la función
    return response;
  }
);


const authSlice = createSlice({
    name: 'auth', //Slice
    initialState: {
        user: null
    },
    reducers: { // Funciones para modificar el state relacionado con auth.
        logout: (state) => {
            state.user = null
            localStorageProvider.deleteToken()
            localStorageProvider.deleteCart()
        },
        updateImg: (state, img) =>{
          state.user = {
            ...state.user,
            image: img.payload
          }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.user = action.payload.data
        }),
        builder.addCase(registerAsync.fulfilled, (state, action) => {
            state.user = action.payload.data
        }),
        builder.addCase(validateLoginAsync.fulfilled, (state, action) => {
          state.user = action.payload.user
        })
    }
}) 

export const {logout, updateImg} = authSlice.actions //Convertimos las funciones en acciones y las exportamos.
export default authSlice.reducer;