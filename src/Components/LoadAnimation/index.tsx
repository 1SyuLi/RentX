import React from 'react';
import LottieView from 'lottie-react-native';

import carLoading from '../../assets/carLoading.json';

import {
    Container
} from './styles';

export function LoadAnimation() {
    return (
        <Container>
            <LottieView
                style={{
                    height: 200
                }}
                resizeMode="contain"
                source={carLoading}
                autoPlay={true}
                loop={true}
            />
        </Container>
    );
}