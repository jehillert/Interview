import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styled from 'styled-components/native';

const S = {};

S.HeaderCol = styled(Col)`
    padding: 20px;
    background-color: green;
`;

S.HeaderText = styled.Text`
    font-weight: bold;
    color: white;
`;

function ColumnHeaders({ fields }) {

    return (
        <Grid>
            {fields ? (
                <Row>
                    {fields.map(field => (
                        <S.HeaderCol key={`${field}-header`}>
                            <S.HeaderText>{field}</S.HeaderText>
                        </S.HeaderCol>
                    ))}
                </Row>
            ) : null}
        </Grid>
    );
}

ColumnHeaders.defaultProps = {
    fields: null,
};

ColumnHeaders.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string),
};

export default ColumnHeaders;
