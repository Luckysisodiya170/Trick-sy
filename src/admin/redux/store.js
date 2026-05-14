// Tricksy/frontend/src/admin/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './slices/adminSlice';

const store = configureStore({
  reducer: {
    adminData: adminReducer,
  },
});

export default store;