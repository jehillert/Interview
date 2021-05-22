import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import useApiResult from './useApiResult';
import axios from 'axios';

const url = 'https://pos-cron-absolute.herokuapp.com/customer/surveys';
const resultsPerPage = 10;

function App() {
    const allResults = useApiResult();
    const [page, setPage] = useState(null);
    const [currentPage, setCurrentPage] = useState([]);

    useEffect(() => {
        if (allResults.length) {
            const startIndex = page * resultsPerPage;
            const endIndex = (page + 1) * resultsPerPage;
            // console.log(startIndex, endIndex);

            // TODO: but this line in 1st useEffect, and edit this one to only change when a button is pressed.
            // setCurrentPage(allResults.slice(0, resultsPerPage));
            // make sure to account for last set of paginated results
            setCurrentPage(allResults.slice(startIndex, endIndex));
            // console.log(
            //     `%ccurrentPage: ${JSON.stringify(currentPage, undefined, 2)}`,
            //     'color: darkred; background-color: gold',
            // );
        }
    }, [allResults, page]);

    // TODO: remember to set keys. Maybe set different colors for different rows
    const table = currentPage.map((record, index) => {
        const cells = Object.keys(record).map((field, index) => (
            <Col key={index}>
                <Text>{record[field]}</Text>
            </Col>
        ));
        return <Row key={record.ID}>{cells}</Row>;
    });

    return (
        <View style={styles.container}>
            <Grid>{table}</Grid>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
