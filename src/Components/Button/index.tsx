import React from 'react';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps, ActivityIndicator } from 'react-native';

import {
    Container,
    Title,
} from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    light?: boolean;
    color?: string;
    disable?: boolean;
    loading?: boolean;
}

export function Button({
    title,
    color,
    disable = false,
    loading = false,
    light = false,
    ...rest
}: Props) {

    const theme = useTheme();

    return (
        <Container
            disabled={disable}
            {...rest}
            color={color}
            style={{ opacity: (disable === true || loading === true) ? .5 : 1 }}
        >

            {loading ?
                <ActivityIndicator color={theme.colors.shape} /> :
                <Title light={light}>{title}</Title>
            }

        </Container>
    );
}