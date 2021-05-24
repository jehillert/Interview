import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Table from './src/components/Table';
import cloneDeep from 'lodash/cloneDeep';
import BasicButton from './src/components/Table/BasicButton';
import SearchBar from './src/components/SearchBar';
import { usePrevious, useSearchLogic, useSurveysEndpoint, useUserEndpoint } from './src/hooks';
import { USER_FIRSTNAME as firstName, USER_USERNAME as username } from '@env';
import { surveyTableFields, userTableFields } from './src/constants';

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
    const [toggle, setToggle] = useState(false);
    const [keyField, setKeyField] = useState('ID');
    const [fields, setFields] = useState(surveyTableFields);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [displayedRecords, setDisplayedRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const prevToggle = usePrevious(toggle);

    useSearchLogic(searchQuery, records, setRecords);

    useEffect(() => {
        if (surveyRecords?.length) {
            setRecords(cloneDeep(surveyRecords));
        }
    }, [surveyRecords]);

    useEffect(() => {
        if (toggle !== prevToggle) {
            const newRecords = cloneDeep(toggle ? userRecords : surveyRecords);
            setKeyField(toggle ? 'username' : 'ID');
            setFields(toggle ? userTableFields : surveyTableFields);
            setRecords(newRecords);
            setPage(0);
        }
    }, [prevToggle, toggle, surveyRecords, userRecords]);

    useEffect(() => {
        if (records?.length) {
            const startIndex = page * resultsPerPage;
            const endIndex = (page + 1) * resultsPerPage;

            setDisplayedRecords(records.slice(startIndex, endIndex));
        }
    }, [records, page]);

    const handleNext = () => setPage(p => (p < Math.ceil(surveyRecords?.length / resultsPerPage) ? ++p : p));

    const handlePrevious = () => setPage(p => (p > 0 ? --p : p));

    const handleSubmitSearch = query => {
        setSearchQuery(query);
    }

    return (
        <SafeAreaView style={styles.container} color="black">
            <SearchBar
                onSubmitQuery={handleSubmitSearch}
                placeholder={'Search...'}
                returnKeyType={'search'}
                autoCorrect={false}
                height={50}
                padding={0}
            />
            <Table records={displayedRecords} fields={fields} keyField={keyField} userData={userData} />
            <S.View>
                <BasicButton onPress={handlePrevious}>previous</BasicButton>
                <BasicButton onPress={handleNext}>next</BasicButton>
            </S.View>
            <S.View>
                <BasicButton onPress={() => setToggle(t => !t)} bgColor="#390202">
                    Toggle Data
                </BasicButton>
            </S.View>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgreen",
    },
});

export default App;
