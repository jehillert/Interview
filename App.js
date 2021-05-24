import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import styled from 'styled-components/native';
import { useSurveysEndpoint, useUserEndpoint } from './src/hooks';
import Table from './src/components/Table';
import { USER_FIRSTNAME as firstName, USER_USERNAME as username } from '@env';
import { surveyTableFields, userTableFields } from './src/constants';
import BasicButton from './src/components/Table/BasicButton';

const S = {};

S.View = styled.View`
    flex-direction: row;
`;

function App() {
    // constants
    const userData = { firstName, username };
    const resultsPerPage = 10;

    // API-dependent state
    const surveyRecords = useSurveysEndpoint();
    const userRecords = useUserEndpoint();

    // local state
    const [page, setPage] = useState(0);
    const [displayedRecords, setDisplayedRecords] = useState([]);

    useEffect(() => {
        if (surveyRecords.length) {
            const startIndex = page * resultsPerPage;
            const endIndex = (page + 1) * resultsPerPage;

            setDisplayedRecords(surveyRecords.slice(startIndex, endIndex));
        }
    }, [surveyRecords, page]);

    const handleToggledDataPress = () => {
        setToggled(prevToggled => !prevToggled);
        setPage(0);
    };

    const handleNext = () => setPage(p => p < Math.ceil(surveyRecords.length / resultsPerPage ) ? ++p : p);
    const handlePrevious = () => setPage(p => p > 0 ? --p : p);

    return (
        <SafeAreaView style={styles.container}>
            <S.View>
                <BasicButton onPress={handleToggledDataPress}>Toggle Data</BasicButton>
            </S.View>
            <S.View>
                <BasicButton onPress={handlePrevious}>previous</BasicButton>
                <BasicButton onPress={handleNext}>next</BasicButton>
            </S.View>
            <Table records={displayedRecords} fields={surveyTableFields} keyField="ID" userData={userData} />
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
