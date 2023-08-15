// import axios from 'axios'

// const token= "1dc8f67cb5ee2d801ef91ff145b4c3a9"

// export default axios.create({
//     baseURL: 'https://api.themoviedb.org/3',
//     headers: {
//         Authorization: `Bearer ${token}`,
//     }
// })

import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data.message;
  } catch (error) {
    throw new Error('Failed to send reset link');
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
    return response.data.message;
  } catch (error) {
    throw new Error('Failed to reset password');
  }
};
