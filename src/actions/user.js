import axios from "axios"
import { setUser } from '../reducers/userReducer'


export const instanceAxios = axios.create({
     baseURL: process.env.REACT_APP_API_URL + "/api/"
})

export const registration = async (name, email, password, dispatch) => {
   try {
        const response = await instanceAxios.post('auth/registration', {
            name,
            email,
            password
        })
        dispatch(login(email, password))
   } catch (e) {
        alert(e.response.data.message)
   }
}

export const login = (email, password) => {
     return async dispatch => {
          try {
               const response = await instanceAxios.post('auth/login', {
                   email,
                   password
               })
               dispatch(setUser(response.data.user))
               localStorage.setItem('token', response.data.token)
          } catch (e) {
               alert(e.response.data.message)
          }
     }
}

export const auth = () => {
     return async dispatch => {
          try {
               const response = await instanceAxios.get('auth/auth',
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
               )
               localStorage.setItem('token', response.data.token)
               dispatch(setUser(response.data.user))
          } catch (e) {
               console.log(e.response.data.message)
               localStorage.removeItem('token')
          }
     }
}

export const uploadAvatar = (file) => {
     return async dispatch => {
          try {
               const formData = new FormData()
               formData.append('file', file)
               const response = await instanceAxios.post('files/avatar', formData,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
               )
               dispatch(setUser(response.data))
          } catch (e) {
               console.log(e)
          }
     }
}

export const deleteAvatar = () => {
     return async dispatch => {
          try {
               const response = await instanceAxios.delete('files/avatar',
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
               )
               dispatch(setUser(response.data))
          } catch (e) {
               console.log(e)
          }
     }
}

export const getAllUsers = async () => {
     try {
         const response = await instanceAxios.get('admin/users', {
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
         });
         return response.data;
     } catch (e) {
         console.log("Error fetching users:", e.response?.data?.message || e.message);
     }
 } 

 export const changeUserStatus = (userId, status) => {
     return async (dispatch) => {
         try {
             const response = await instanceAxios.put('admin/changeStatus', { userId, status }, {
                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
             });
             console.log('Status updated successfully');
         } catch (e) {
             console.log('Failed to update status', e);
         }
     };
 }; 