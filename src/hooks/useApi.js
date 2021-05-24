import { useState, useEffect } from 'react';
import { getSurveyRecords, getToken, getUserRecords } from '../api';

export function useUserEndpoint() {
    const [userRecords, setUserRecords] = useState([]);

    useEffect(() => {
        getUserRecords().then(data => setUserRecords(data));
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
