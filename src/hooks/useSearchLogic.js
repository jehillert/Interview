import { useEffect, useRef } from 'react';

const containsExactMatch = records => {

}

function useSearchLogic(searchQuery, records, setRecordsCallback) {
    const ref = useRef();

    useEffect(() => {
        console.log(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        console.log(records);
    }, [records]);
}

export default useSearchLogic;
