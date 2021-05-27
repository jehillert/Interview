import { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import usePrevious from './usePrevious';
import { largeSurveyData } from '../test-data';

const getRecordsWithExactMatch = (records, queryString = '') => {
    if (queryString === '') {
        return [];
    }
    const str = queryString.toLowerCase();
    return cloneDeep(records.filter(record => Object.values(record).some(value => String(value).toLowerCase().includes(str))));
};

function useSearchLogic(records, searchQuery) {
    const [searchResults, setSearchResults] = useState([]);
    const prevSearchQuery = usePrevious(searchQuery);

    useEffect(() => {
        if (prevSearchQuery !== searchQuery) {
            console.log(`searchQuery: ${searchQuery}`)
            console.log(`prevSearchQuery: ${prevSearchQuery}`)
            if (searchQuery === '') {
                setSearchResults([]);
            } else if (records.length && searchQuery) {
                const newSearchResults = getRecordsWithExactMatch(records, searchQuery);
                console.log(newSearchResults);
                setSearchResults(newSearchResults);
            }
        }
    }, [/* prevSearchQuery, records, searchResults, setSearchResults,  */searchQuery]);

    return searchResults;
}

export default useSearchLogic;

// const testStr = 'ayesh';
// console.log(getRecordsWithExactMatch(largeSurveyData, testStr));
