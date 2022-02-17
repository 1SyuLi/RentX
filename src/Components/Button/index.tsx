import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Title,
} from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    color?: string;
    disable?: boolean;
}

export function Button({ title, color, disable = false, ...rest }: Props) {
    return (
        <Container
            disabled={disable}
            {...rest}
            color={color}
            style={{ opacity: disable ? .5 : 1 }}
        >
            <Title>{title}</Title>
        </Container>
    );
}