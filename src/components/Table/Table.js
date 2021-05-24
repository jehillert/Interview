import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styled from 'styled-components/native';
import ColumnHeaders from './ColumnHeaders';
import TableHeader from './TableHeader';

const S = {};

S.Grid = styled(Grid)``;

S.Col = styled(Col)`
    background-color: lightgreen;
`;

S.Text = styled.Text`
    color: black;
`;

function Table({ fields: specifiedFields, fieldForId, includeHeader, records, userData }) {
    const shouldUseRecordFieldsAsHeaders = !specifiedFields && records[0];
    const fields = shouldUseRecordFieldsAsHeaders ? Object.keys(records[0]) : specifiedFields;
    const shouldBeColHeaders = fields && includeHeader;

    const table = records.map((record, index) => {
        const cells = fields.map(field => (
            <S.Col key={`${field}-${index}`}>
                <S.Text>{record[field]}</S.Text>
            </S.Col>
        ));
        console.log(fieldForId)
        return <Row key={record[fieldForId]}>{cells}</Row>;
    });

    return (
        <>
            <TableHeader userData={userData} />
            {shouldBeColHeaders ? <ColumnHeaders fields={fields} /> : null}
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
    fieldForId: 'id',
    includeHeader: true,
};

Table.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string),
    fieldForId: PropTypes.string,
    includeHeader: PropTypes.bool,
    records: PropTypes.arrayOf(PropTypes.object).isRequired,
    userData: PropTypes.object.isRequired,
};

export default Table;
