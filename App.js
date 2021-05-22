import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';

const url = 'https://pos-cron-absolute.herokuapp.com/customer/surveys';
const resultsPerPage = 10;

function App() {
    const [allResults, setAllResults] = useState([]);
    const [page, setPage] = useState(null);
    const [currentPage, setCurrentPage] = useState([]);

    useEffect(() => {
        if (!allResults.length) {
            axios.get(url).then(({ data }) => {
                setAllResults(data);
                setPage(0);
            });
        }
    }, []);

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
    // const row = Object.keys(record).map(field => (<Col><Text>field</Text></Col>))
    const table = currentPage.map(
        ({ ID, Review, Rating, ProviderEmail, FirstName, LastName, ReviewCompletedTimeStamp }, index) => (
            <Grid>
                <Row>
                    <Col>
                        <Text>{ID}</Text>
                    </Col>
                    <Col>
                        <Text>{Review}</Text>
                    </Col>
                    <Col>
                        <Text>{Rating}</Text>
                    </Col>
                    <Col>
                        <Text>{ProviderEmail}</Text>
                    </Col>
                    <Col>
                        <Text>{FirstName}</Text>
                    </Col>
                    <Col>
                        <Text>{LastName}</Text>
                    </Col>
                    <Col>
                        <Text>{ReviewCompletedTimeStamp}</Text>
                    </Col>
                </Row>
            </Grid>
        ),
    );

    console.log(table);

    return (
        <View style={styles.container}>
            <Text>{Array.isArray([]) && 'hello'}</Text>
            {table}
            <StatusBar style="auto" />
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
