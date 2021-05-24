import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styled from 'styled-components/native';

const S = {};

S.ColumnHeaderGrid = styled(Grid)`
    max-height: 30px;
`;

S.ColumnHeaderCol = styled(Col)`
    padding: 5px;
    background-color: green;
    border: grey 0.5px;
`;

S.ColumnHeaderText = styled.Text`
    font-weight: bold;
    color: white;
    font-size: 13px;
    margin: auto;
`;

function ColumnHeaders({ fields }) {
    const camelToTitleCase = str => str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
    const headers = fields.map(field => camelToTitleCase(field));

    return (
        <S.ColumnHeaderGrid>
            {fields ? (
                <Row>
                    {headers.map(header => (
                        <S.ColumnHeaderCol key={`${header}-header`}>
                            <S.ColumnHeaderText>{header}</S.ColumnHeaderText>
                        </S.ColumnHeaderCol>
                    ))}
                </Row>
            ) : null}
        </S.ColumnHeaderGrid>
    );
}

ColumnHeaders.defaultProps = {
    fields: null,
};

ColumnHeaders.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string),
};

export default ColumnHeaders;
