import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://task-management-platform-server.vercel.app'
  });

const useAxiosPublic = () => {
    return instance;
};
// http://localhost:5000/
//https://task-management-platform-server.vercel.app
export default useAxiosPublic;