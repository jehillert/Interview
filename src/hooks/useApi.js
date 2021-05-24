import { useState, useEffect } from 'react';
import { getSurveyRecords, getToken, getUserRecords } from '../api';

export function useUserEndpoint() {
    const [userRecords, setUserRecords] = useState([]);

    useEffect(() => {
        getUserRecords().then(data => setUserRecords(data));
        // userRecords.forEach(value => {
        //     console.log(value.username);
        // })
    }, []);

    return userRecords;
}

export function useSurveysEndpoint() {
    const [surveyRecords, setSurveyRecords] = useState([]);

    useEffect(() => {
        getSurveyRecords().then(data => setSurveyRecords(data));
    }, []);

    return surveyRecords;
}

// unused
export function useAuthEndpoint() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        getToken().then(token => setToken(token));
    }, []);
    return token;
}
