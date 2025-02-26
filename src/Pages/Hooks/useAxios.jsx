import axios from "axios";

const axiosPublic = axios.create({
    baseURL : 'http://localhost:2000/'
})
const useAxios = () => {
    return axiosPublic;
};

export default useAxios;