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
}

export function PasswordInput({ iconName, ...rest }: InputProps) {

    const theme = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    function handlePasswordVisible() {
        setIsPasswordVisible(oldState => !oldState);
    }

    return (
        <Container>
            <IconContainer>
                <Feather name={iconName} size={24} color={theme.colors.text_detail} />
            </IconContainer>


            <InputText
                secureTextEntry={isPasswordVisible}
                {...rest}
            />

            <TouchableOpacity activeOpacity={0.5} onPress={handlePasswordVisible}>
                <IconContainer>
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