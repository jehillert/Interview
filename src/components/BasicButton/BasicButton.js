import React from 'react';
import styled from 'styled-components/native';

const S = {};

S.TouchableOpacity = styled.TouchableOpacity`
    flex: 1;
    height: 70px;
    margin: 15px;
    background: ${({ bgColor }) => (bgColor ? bgColor : 'darkgrey')};
`;

S.Text = styled.Text`
    font-size: 18px;
    color: ${({ fgColor }) => (fgColor ? fgColor : 'white')};
    margin: auto;
`;

function BasicButton({ bgColor, fgColor, children, className, onPress }) {
    return (
        <S.TouchableOpacity bgColor={bgColor} className={className} onPress={onPress}>
            <S.Text fgColor={fgColor}>{children}</S.Text>
        </S.TouchableOpacity>
    );
}

export default BasicButton;
