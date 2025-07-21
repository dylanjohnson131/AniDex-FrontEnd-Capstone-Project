import usersData from './database.json';


export const getAllUsers = () => {
  return Promise.resolve(usersData.Users);
} 