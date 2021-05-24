import axios from 'axios';
import { API_BASE_URL, USER_EMAIL, USER_PASSWORD } from '@env';

// AXIOS CONFIG
axios.defaults.baseURL = `${API_BASE_URL}/`;

// API REQUESTS
const getToken = () => {
    const body = {
        email: USER_EMAIL,
        password: USER_PASSWORD,
    };

    return axios
        .post(`auth`, body)
        .then(res => res.data.token)
        .catch(err => console.error(err));
};

const getSurveyRecords = () =>
    axios
        .get(`customer/surveys`)
        .then(({ data }) => data)
        .catch(err => console.error(err));

const getUserRecords = () =>
    getToken().then(token => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axios
            .get(`users`)
            .then(({ data }) => data)
            .catch(err => console.error(err));
    });

const getUserData = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axios
            .get(`users`)
            .then(({ data }) => data)
            .catch(err => console.error(err));
    }
};

export { getToken, getSurveyRecords, getUserData, getUserRecords };
