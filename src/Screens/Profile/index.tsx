import React, { useState } from 'react';
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
    Content,
    Options,
    Option,
    OptionTitle,
} from './styles';


type Option = 'dataEdit' | 'passwordEdit';

export function Profile() {


    const theme = useTheme();
    const navigation = useNavigation();

    const [option, setOption] = useState<Option>('dataEdit');

    function handleSignOut() { };

    function handleGoBack() {
        navigation.goBack();
    }

    function handleOption(option: Option) {
        setOption(option);
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

            <Content>
                <Options>
                    <Option
                        active={option === 'dataEdit'}
                        onPress={() => handleOption('dataEdit')}
                    >
                        <OptionTitle active={option === 'dataEdit'}>
                            Dados
                        </OptionTitle>
                    </Option>

                    <Option
                        active={option === 'passwordEdit'}
                        onPress={() => handleOption('passwordEdit')}
                    >
                        <OptionTitle active={option === 'passwordEdit'}>
                            Trocar senha
                        </OptionTitle>
                    </Option>
                </Options>
            </Content>
        </Container>
    );
}