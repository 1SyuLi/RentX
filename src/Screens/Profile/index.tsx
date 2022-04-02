import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { BackButton } from '../../Components/BackButton';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LoggoutButton,
    ImageContainer,
    Photo,
    PhotoButton,
} from './styles';

export function Profile() {

    const theme = useTheme();
    const navigation = useNavigation();


    function handleSignOut() { };

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.colors.header} barStyle="light-content" />
            <Header>
                <HeaderTop>
                    <BackButton onPress={handleGoBack} />

                    <HeaderTitle>Editar Perfil</HeaderTitle>

                    <LoggoutButton onPress={handleSignOut}>
                        <Feather name='power' size={24} color={theme.colors.shape} />
                    </LoggoutButton>
                </HeaderTop>

                <ImageContainer>
                    <Photo source={{ uri: 'https://github.com/1syuli.png' }} />

                    <PhotoButton onPress={() => { }}>
                        <Feather name='camera' size={24} color={theme.colors.shape} />
                    </PhotoButton>
                </ImageContainer>
            </Header>
        </Container>
    );
}