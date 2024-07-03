import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  access_token: '',
  isAdmin: false
}

export const userSilde = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = '', email = '', address = '', phone = '', avatar = '', access_token, _id = '', isAdmin } = action.payload
      state.id = _id;
      state.name = name ;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.avatar = avatar;
      state.access_token = access_token
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.address = '';
      state.phone = '';
      state.avatar = '';
      state.access_token = '';
      state.isAdmin = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSilde.actions

export default userSilde.reducer