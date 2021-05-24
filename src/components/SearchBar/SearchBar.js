// adapted from: https://github.com/ananddayalan/react-native-material-design-searchbar/blob/master/SearchBar.js
import React, { useRef, useState } from 'react';
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
        borderWidth: 1,
    },
    searchBarInput: {
        flex: 1,
        fontWeight: 'normal',
        color: '#212121',
        backgroundColor: 'transparent',
    },
});

function SearchBar({
    onBlur,
    onClear,
    onFocus,
    onBackPress,
    onEndEditing,
    onSearchChange,
    onSubmitEditing,
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
    const [isOnFocus, setIsOnFocus] = useState(false);
    const [searchValue, setSearchValue] = useState(searchValue);

    const handleSearchChange = searchValue => {
        setSearchValue({ searchValue });
        onSearchChange && onSearchChange(searchValue);
    };

    const handleClear = () => {
        this.onSearchChange('');
        onClear && onClear();
    };

    const handleFocus = () => {
        setIsOnFocus(true);
        if (onFocus) {
            onFocus();
        }
    };

    const handleBlur = () => {
        setIsOnFocus(false);
        if (onBlur) {
            onBlur();
        }
        Keyboard.dismiss();
    };

    const handleBackPress = () => {
        Keyboard.dismiss();
        if (onBackPress) {
            onBackPress();
        }
    };

    const setText = (text, focus) => {
        textInputRef.current.setNativeProps({ text: text });
        if (focus) {
            onFocus();
        }
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
                {isOnFocus || alwaysShowBackButton ? (
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
                    // ref={c => (textInput = c)}
                    value={searchValue}
                    autoCorrect={autoCorrect === true}
                    returnKeyType={returnKeyType}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={onSearchChange}
                    onEndEditing={onEndEditing}
                    onSubmitEditing={onSubmitEditing}
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
                {isOnFocus ? (
                    <TouchableOpacity onPress={onClear}>
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
    onBlur: () => {},
    onClear: () => {},
    onFocus: () => {},
    onSearchChange: () => {},
    onEndEditing: () => {},
    onSubmitEditing: () => {},
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
    searchValue: '',
    textStyle: {},
};

SearchBar.propTypes = {
    onBlur: PropTypes.func,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
    onBackPress: PropTypes.func,
    onEndEditing: PropTypes.func,
    onSearchChange: PropTypes.func,
    onSubmitEditing: PropTypes.func,
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
