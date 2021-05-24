// adapted from: https://github.com/ananddayalan/react-native-material-design-searchbar/blob/master/SearchBar.js
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet, View, TouchableOpacity, ActivityIndicator, Text, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: '#b6b6b6',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    searchBarInput: {
        flex: 1,
        fontWeight: 'normal',
        color: '#212121',
        backgroundColor: 'transparent',
    },
});

function SearchBar({
    onBackPress,
    onSubmitQuery,
    alwaysShowBackButton,
    autoCorrect,
    height,
    iconBackComponent,
    iconBackName,
    iconCloseComponent,
    iconCloseName,
    iconColor,
    iconSearchComponent,
    iconSearchName,
    inputProps,
    inputStyle,
    padding,
    placeholder,
    placeholderColor,
    returnKeyType,
    textStyle,
    ...rest
}) {
    let { iconSize, iconPadding } = rest;

    iconSize = typeof iconSize !== 'undefined' ? iconSize : height * 0.5;
    iconPadding = typeof iconPadding !== 'undefined' ? iconPadding : height * 0.25;

    const textInputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        textInputRef.current.setNativeProps({ text: query });
    }, [query]);

    const handleSearchChange = query => {
        setQuery(query);
    };

    const handleClear = () => {
        handleSearchChange('');
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        Keyboard.dismiss();
    };

    const handleBackPress = () => {
        Keyboard.dismiss();
        onBackPress();
    };

    const handleQuerySubmit = () => {
        onSubmitQuery(query);
    };

    return (
        <View onStartShouldSetResponder={Keyboard.dismiss} style={{ padding: padding }}>
            <View
                style={[
                    styles.searchBar,
                    {
                        height: height,
                        paddingLeft: iconPadding,
                    },
                    inputStyle,
                ]}>
                {isFocused || alwaysShowBackButton ? (
                    <TouchableOpacity onPress={handleBackPress}>
                        {iconBackComponent ? (
                            iconBackComponent
                        ) : (
                            <Icon name={iconBackName} size={height * 0.5} color={iconColor} />
                        )}
                    </TouchableOpacity>
                ) : iconSearchComponent ? (
                    iconSearchComponent
                ) : (
                    <Icon name={iconSearchName} size={height * 0.5} color={iconColor} />
                )}
                <TextInput
                    ref={textInputRef}
                    value={query}
                    autoCorrect={autoCorrect === true}
                    returnKeyType={returnKeyType}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={handleSearchChange}
                    onSubmitEditing={() => handleQuerySubmit(query)}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor}
                    underlineColorAndroid="transparent"
                    style={[
                        styles.searchBarInput,
                        {
                            paddingLeft: iconPadding,
                            fontSize: height * 0.4,
                        },
                        textStyle,
                    ]}
                    {...inputProps}
                />
                {isFocused ? (
                    <TouchableOpacity onPress={handleClear}>
                        {iconCloseComponent ? (
                            iconCloseComponent
                        ) : (
                            <Icon
                                style={{ paddingRight: iconPadding }}
                                name={iconCloseName}
                                size={iconSize}
                                color={iconColor}
                            />
                        )}
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
}

SearchBar.defaultProps = {
    onBackPress: () => {},
    onSubmitQuery: () => {},
    alwaysShowBackButton: false,
    iconBackName: 'md-arrow-back',
    iconCloseName: 'md-close',
    iconColor: '#737373',
    iconSearchName: 'md-search',
    inputStyle: {},
    padding: 5,
    placeholder: 'Search...',
    placeholderColor: '#bdbdbd',
    returnKeyType: 'search',
    query: '',
    textStyle: {},
};

SearchBar.propTypes = {
    onBackPress: PropTypes.func,
    onSubmitQuery: PropTypes.func,
    alwaysShowBackButton: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    height: PropTypes.number.isRequired,
    iconBackComponent: PropTypes.object,
    iconBackName: PropTypes.string,
    iconCloseComponent: PropTypes.object,
    iconCloseName: PropTypes.string,
    iconColor: PropTypes.string,
    iconSearchComponent: PropTypes.object,
    iconSearchName: PropTypes.string,
    inputProps: PropTypes.object,
    inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    padding: PropTypes.number,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    returnKeyType: PropTypes.string,
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SearchBar;
