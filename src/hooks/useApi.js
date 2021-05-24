import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@env';

// AXIOS CONFIG
axios.defaults.baseURL = `${API_BASE_URL}/`;

// API REQUESTS
const getToken = () => {
    const body = {
        "email": "test@test.com",
        "password": "letmein"
    }

    return axios
        .post(`auth`, body)
        .then((res) => res.data.token)
        .catch(err => console.error(err));
}

const getSurveyData = () => axios
    .get(`customer/surveys`)
    .then(({ data }) => data)
    .catch(err => console.error(err));

export function getUserData(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`users`)
            .then(({ data }) => console.log(data))
            .catch(err => console.error(err));
    }
    console.log(axios.defaults.headers.common)
}

// HOOKS CONSUMING API
export function useSurveysEndpoint() {
    const [surveyData, setSurveyData] = useState([]);

    useEffect(() => {
        if (!surveyData.length) {
            getSurveyData().then(data => setSurveyData(data));
        }
    }, []);

    return surveyData;
}

export function useAuthEndpoint() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!token) {
            getToken().then(token => setToken(token));
        }
    }, []);
    console.log(token);
    return token;
}

export function useUserEndpoint() {
    getToken().then(token => console.log(token))
}
