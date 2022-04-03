import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StatusBar, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { BackButton } from '../../Components/BackButton';
import { Input } from '../SignIn/Input';
import { Button } from '../../Components/Button';
import { PasswordInput } from '../SignIn/PasswordInput';

import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

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

    const { user, signOut, updatedUser } = useAuth();


    const theme = useTheme();
    const navigation = useNavigation();

    const [option, setOption] = useState<Option>('dataEdit');
    const [avatar, setAvatar] = useState<string>(user.avatar);
    const [name, setName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);
    const [driver_license, setDriverLicense] = useState<string>(user.driver_license);


    function handleGoBack() {
        navigation.goBack();
    }

    function handleOption(option: Option) {
        setOption(option);
    }

    async function handleChangeAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if (result.cancelled) {
            return;
        }

        if (result.uri) {
            setAvatar(result.uri);
        }
    }

    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatório'),
                driver_license: Yup.string().required('CNH é obrigatório'),
            });

            const data = { name, driver_license };
            await schema.validate(data);

            await updatedUser({
                id: user.id,
                user_id: user.user_id,
                name,
                email: user.email,
                driver_license,
                avatar,
                token: user.token,
            });

            Alert.alert('Perfil atualizado com sucesso!');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Opa', 'Algo deu errado');
            }
        }
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.colors.header} barStyle="light-content" />
            <Header>
                <HeaderTop>
                    <BackButton onPress={handleGoBack} />

                    <HeaderTitle>Editar Perfil</HeaderTitle>

                    <LoggoutButton onPress={signOut}>
                        <Feather name='power' size={24} color={theme.colors.shape} />
                    </LoggoutButton>
                </HeaderTop>

                <ImageContainer>
                    {!!avatar && <Photo source={{ uri: avatar }} />}

                    <PhotoButton onPress={handleChangeAvatar}>
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
                                onChangeText={setName}
                            />

                            <Input
                                iconName='mail'
                                editable={false}
                                autoCorrect={false}
                                autoCapitalize='none'
                                defaultValue={user.email}
                                onChangeText={setEmail}
                            />

                            <Input
                                iconName='credit-card'
                                placeholder='CNH'
                                keyboardType='numeric'
                                autoCapitalize='none'
                                defaultValue={user.driver_license}
                                onChangeText={setDriverLicense}
                            />
                        </Section>
                        :
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

                <Button
                    title='Salvar alterações'
                    onPress={handleProfileUpdate}
                />
            </Content>
        </Container>
    );
}