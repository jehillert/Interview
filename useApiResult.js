import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://pos-cron-absolute.herokuapp.com/customer/surveys';

function useApiResult() {
    const [allResults, setAllResults] = useState([]);

    useEffect(() => {
        if (!allResults.length) {
            axios.get(url).then(({ data }) => {
                setAllResults(data);
            });
        }
    }, []);

    return allResults;
}

export default useApiResult;
