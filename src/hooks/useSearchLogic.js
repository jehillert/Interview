import { useEffect, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import * as data from '../test-data';

const getRecordsWithExactMatch = (records, str) => {
    return cloneDeep(
        records.filter(record => Object.values(record).some(value => String(value).includes(str)))
    );
}

function useSearchLogic(searchQuery, records, setRecordsCallback) {
    let newRecords = [];
    const ref = useRef();

    useEffect(() => {
        newRecords = getRecordsWithExactMatch(records, searchQuery);
        setRecordsCallback(newRecords);
    }, [searchQuery]);

    useEffect(() => {
        // console.log(records);
    }, [records]);
}

export default useSearchLogic;

const testData = data.smallUserData;
const testStr = '9521';
console.log(getRecordsWithExactMatch(testData, testStr));
