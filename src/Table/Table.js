import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styled from 'styled-components/native';
import HeadersOfColumns from './ColumnHeaders';

const S = {};

S.Col = styled(Col)`
    padding: 20px;
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

function Table({ fields: specifiedFields, includeHeader, records }) {
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
        <Grid>
            {shouldBeColHeaders ? (<HeadersOfColumns fields={fields} />) : null}
            {table}
        </Grid>
    );
}

Table.defaultProps = {
    fields: null,
    includeHeader: true,
};

Table.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string),
    includeHeader: PropTypes.bool,
    records: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
