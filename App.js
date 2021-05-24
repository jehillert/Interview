import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useSurveysEndpoint, useAuthEndpoint} from './src/hooks/useApi';
import Table from './src/components/Table';
import { USER_FIRSTNAME as firstName, USER_USERNAME as username } from '@env';
import { defaultTableFields } from './src/constants';

const S = {};

function App() {
    const userData = { firstName, username };
    const resultsPerPage = 10;
    const allResults = useSurveysEndpoint();
    const token = useAuthEndpoint();
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState([]);

    useEffect(() => {
        console.log(token);
    }, [token]);

    useEffect(() => {
        if (allResults.length) {
            const startIndex = page * resultsPerPage;
            const endIndex = (page + 1) * resultsPerPage;

            // TODO: make sure to account for last set of paginated results
            setCurrentPage(allResults.slice(startIndex, endIndex));
        }
    }, [allResults, page]);

    return (
        <SafeAreaView style={styles.container}>
            <Table records={currentPage} fields={defaultTableFields} userData={userData} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
});

export default App;
