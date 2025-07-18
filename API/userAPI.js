// we are importing usersData from the database so that we can grab it
// in the function below
import usersData from './database.json';

// we are creating and exporting a getAllUsers function so that we can fetch
//  all of the users data.
export const getAllUsers = () => {
  // we will return the resolved promise of the array of user objects
  return Promise.resolve(usersData.Users);
}