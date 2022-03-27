import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps, TouchableOpacity } from 'react-native';


import {
    Container,
    InputText,
    IconContainer,
} from './styles';


interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {

    const theme = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const [isFocused, setIsfocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsfocused(true);
    }

    function handleInputBlur() {
        setIsfocused(false);
        setIsFilled(!!value);
    }

    function handlePasswordVisible() {
        setIsPasswordVisible(oldState => !oldState);
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>


            <InputText
                secureTextEntry={isPasswordVisible}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                {...rest}
            />

            <TouchableOpacity activeOpacity={0.5} onPress={handlePasswordVisible}>
                <IconContainer isFocused={isFocused}>
                    <Feather
                        name={isPasswordVisible ? "eye" : "eye-off"}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </TouchableOpacity>
        </Container>
    );
}