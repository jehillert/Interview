import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styled from 'styled-components/native';

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

function TableHeader() {
    return (
        <Grid>
            {shouldBeColHeaders ? (<HeadersOfColumns fields={fields} />) : null}
            {TableHeader}
        </Grid>
    );
}

TableHeader.defaultProps = {
    username:,
    firstName:,
    lastName:,
    avatarSource:,
};

TableHeader.propTypes = {

};

export default TableHeader;
