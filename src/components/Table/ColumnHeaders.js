import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styled from 'styled-components/native';

const S = {};

S.ColumnHeaderGrid = styled(Grid)`
    max-height: 80px;
`;

S.ColumnHeaderCol = styled(Col)`
    padding: 20px;
    background-color: green;
`;

S.ColumnHeaderText = styled.Text`
    font-weight: bold;
    color: white;
    /* font-size: 14px; */
`;

function ColumnHeaders({ fields }) {
    return (
        <S.ColumnHeaderGrid>
            {fields ? (
                <Row>
                    {fields.map(field => (
                        <S.ColumnHeaderCol key={`${field}-header`}>
                            <S.ColumnHeaderText>{field}</S.ColumnHeaderText>
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
