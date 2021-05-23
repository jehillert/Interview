import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-native-easy-grid';
import TextAvatar from 'react-native-text-avatar';
import styled from 'styled-components/native';

const S = {};

S.Row = styled(Row)`
    background-color: #1b2639;
`;

S.Col = styled(Col)`
    display: flex;
    height: 80px;
`;

S.Text = styled.Text`
    margin: auto auto auto 20px;
    color: #ffdd00;
`;

S.TextAvatar = styled(TextAvatar)`
    margin: auto 20px auto auto;
    color: white;
`;

function TableHeader({ userData }) {
    const { firstName, username } = userData;
    return (
        <S.Row>
            <S.Col>
                <S.Text>{username}</S.Text>
            </S.Col>
            <S.Col>
                <S.TextAvatar
                    backgroundColor={'#ffff00'}
                    textColor={'#0000ff'}
                    size={60}
                    type={'circle'} // optional
                >
                    {firstName[0]}
                </S.TextAvatar>
            </S.Col>
        </S.Row>
    );
}

TableHeader.propTypes = {
    userData: PropTypes.shape({
        firstName: PropTypes.string,
        username: PropTypes.string,
    })
};

export default TableHeader;
