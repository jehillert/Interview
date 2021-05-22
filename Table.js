import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styled from 'styled-components/native';

const S = {};

function Table({ fields: specifiedFields, includeHeader, records }) {
    let fields = specifiedFields;

    if (!fields && records[0]) {
        fields = Object.keys(records[0]);
    }

    const table = records.map((record, index) => {
        const cells = fields.map(field => (
            <Col key={`${field}-${index}`}>
                <Text>{record[field]}</Text>
            </Col>
        ));
        return <Row key={record.ID}>{cells}</Row>;
    });

    const header = fields && includeHeader
        ? (
            <Row>
                {fields.map(field => (
                    <Col key={`${field}-header`}>
                        <Text>{field}</Text>
                    </Col>
                ))}
            </Row>
        ) : null;

    return (
        <Grid>
            {header}
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
