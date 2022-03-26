import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';


import {
    Container,
    InputText,
    IconContainer
} from './styles';


interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
}

export function Input({ iconName, ...rest }: InputProps) {

    const theme = useTheme();


    return (
        <Container>
            <IconContainer>
                <Feather name={iconName} size={24} color={theme.colors.title} />
            </IconContainer>


            <InputText {...rest} />
        </Container>
    );
}