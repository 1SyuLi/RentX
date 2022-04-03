import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { BackButton } from '../../Components/BackButton';
import { Input } from '../SignIn/Input';
import { PasswordInput } from '../SignIn/PasswordInput';

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
    Section
} from './styles';
import { useAuth } from '../../hooks/auth';


type Option = 'dataEdit' | 'passwordEdit';

export function Profile() {

    const { user } = useAuth();


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

                {
                    option === 'dataEdit' ?
                        <Section>
                            <Input
                                iconName='user'
                                placeholder='Nome'
                                autoCorrect={false}
                                autoCapitalize='none'
                                defaultValue={user.name}
                            />

                            <Input
                                iconName='mail'
                                editable={false}
                                autoCorrect={false}
                                autoCapitalize='none'
                                defaultValue={user.email}
                            />

                            <Input
                                iconName='credit-card'
                                placeholder='CNH'
                                keyboardType='numeric'
                                autoCapitalize='none'
                                defaultValue={user.driver_license}
                            />
                        </Section> :
                        <Section>
                            <PasswordInput
                                iconName='lock'
                                placeholder='Senha atual'
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                            <PasswordInput
                                iconName='lock'
                                placeholder='Nova senha'
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                            <PasswordInput
                                iconName='lock'
                                placeholder='Confirmar senha'
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                        </Section>
                }

            </Content>
        </Container>
    );
}