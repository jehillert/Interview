import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_CUSTOMER_SURVEYS as baseUrl } from '@env';

function useApiResult() {
    const [allResults, setAllResults] = useState([]);

    useEffect(() => {
        if (!allResults.length) {
            axios.get(baseUrl).then(({ data }) => {
                setAllResults(data);
            });
        }
    }, []);

    return allResults;
}

export default useApiResult;
