import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const S = {};

S.TouchableOpacity = styled.TouchableOpacity`
    flex: 1;
    height: 40px;
    margin: 0px;
    background: ${({ bgColor }) => (bgColor ? bgColor : '#025331')};
`;

S.Text = styled.Text`
    font-size: 14px;
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

BasicButton.defaultProps = {
    bgColor: null,
    children: null,
    className: '',
    fgColor: '',
};

BasicButton.propTypes = {
    bgColor: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    fgColor: PropTypes.string,
    onPress: PropTypes.func.isRequired,
};

export default BasicButton;
