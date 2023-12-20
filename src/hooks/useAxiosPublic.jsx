import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:5000/'
  });

const useAxiosPublic = () => {
    return instance;
};
// http://localhost:5000/
export default useAxiosPublic;