import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import { useSurveysEndpoint, useUserEndpoint} from './src/useApi';
import Table from './src/components/Table';
import { USER_FIRSTNAME as firstName, USER_USERNAME as username } from '@env';
import { defaultTableFields } from './src/constants';
import BasicButton from './src/components/BasicButton';

const S = {};

function App() {
    // constants
    const userData = { firstName, username };
    const resultsPerPage = 10;

    // API-dependent state
    const surveyRecords = useSurveysEndpoint();
    const userRecords = useUserEndpoint();

    // local state
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState([]);

    useEffect(() => {
        if (surveyRecords.length) {
            const startIndex = page * resultsPerPage;
            const endIndex = (page + 1) * resultsPerPage;

            setCurrentPage(surveyRecords.slice(startIndex, endIndex));
        }
    }, [surveyRecords, page]);

    return (
        <SafeAreaView style={styles.container}>
            <View></View>
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
