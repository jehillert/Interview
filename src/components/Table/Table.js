import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styled from 'styled-components/native';
import HeadersOfColumns from './ColumnHeaders';
import TableHeader from './TableHeader';

const S = {};

S.Grid = styled(Grid)`
`;

S.HeaderGrid = styled(S.Grid)`
    max-height: 80px;
`;


S.ColumnHeaderGrid = styled(S.Grid)`
    max-height: 80px;
`;

S.Col = styled(Col)`
    background-color: lightgreen;
`;

S.Text = styled.Text`
    color: black;
`;

S.HeaderCol = styled(S.Col)`
    background-color: green;
`;

S.HeaderText = styled(S.Text)`
    font-weight: bold;
    color: white;
`;

function Table({ fields: specifiedFields, includeHeader, records, userData }) {
    const shouldUseRecordFieldsAsHeaders = !specifiedFields && records[0];
    const fields = shouldUseRecordFieldsAsHeaders ? Object.keys(records[0]) : specifiedFields;
    const shouldBeColHeaders = fields && includeHeader;

    const table = records.map((record, index) => {
        const cells = fields.map(field => (
            <S.Col key={`${field}-${index}`}>
                <S.Text>{record[field]}</S.Text>
            </S.Col>
        ));
        return <Row key={record.ID}>{cells}</Row>;
    });

    return (
        <>
        <S.HeaderGrid>
            <TableHeader userData={userData} />
        </S.HeaderGrid>
        <S.ColumnHeaderGrid>
            {shouldBeColHeaders ? <HeadersOfColumns fields={fields} /> : null}
        </S.ColumnHeaderGrid>
        <S.Grid>
            <ScrollView styles={styles.scrollView}>{table}</ScrollView>
        </S.Grid>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
});

Table.defaultProps = {
    fields: null,
    includeHeader: true,
};

Table.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string),
    includeHeader: PropTypes.bool,
    records: PropTypes.arrayOf(PropTypes.object).isRequired,
    userData: PropTypes.object.isRequired,
};

export default Table;
