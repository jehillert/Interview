import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import TextAvatar from 'react-native-text-avatar';
import styled from 'styled-components/native';

const S = {};

S.TableHeaderGrid = styled(Grid)`
    max-height: 80px;
`;

S.TableHeaderRow = styled(Row)`
    background-color: black;
`;

S.TableHeaderCol = styled(Col)`
    display: flex;
    height: 80px;
`;

S.TableHeaderText = styled.Text`
    font-size: 18px;
    margin: auto auto auto 20px;
    color: #ffdd00;
`;

S.TableHeaderTextAvatar = styled(TextAvatar)`
    margin: auto 20px auto auto;
    color: white;
`;

function TableHeader({ userData }) {
    const { firstName, username } = userData;
    return (
        <S.TableHeaderGrid>
        <S.TableHeaderRow>
            <S.TableHeaderCol>
                <S.TableHeaderText>{username}</S.TableHeaderText>
            </S.TableHeaderCol>
            <S.TableHeaderCol>
                <S.TableHeaderTextAvatar
                    backgroundColor={'#ffff00'}
                    textColor={'#0000ff'}
                    size={60}
                    type={'circle'} // optional
                >
                    {firstName[0]}
                </S.TableHeaderTextAvatar>
            </S.TableHeaderCol>
        </S.TableHeaderRow>
        </S.TableHeaderGrid>
    );
}

TableHeader.propTypes = {
    userData: PropTypes.shape({
        firstName: PropTypes.string,
        username: PropTypes.string,
    })
};

export default TableHeader;
