import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../Components/BackButton';
import { Bullet } from '../../../Components/Bullet';
import { PasswordInput } from '../../SignIn/PasswordInput';
import { Button } from '../../../Components/Button';

import { api } from '../../../services/api';
import { Confirmation } from '../../Confirmation';


import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';



interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SignUpSecondStep() {

    const [password, SetPassword] = useState('');
    const [passwordConfirm, SetPasswordConfirm] = useState('');

    const route = useRoute();
    const { user } = route.params as Params;

    const theme = useTheme();
    const navigation = useNavigation<any>();

    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        if (!password || !passwordConfirm) {
            return Alert.alert('Informe todos os campos.');
        };

        if (password != passwordConfirm) {
            return Alert.alert('As senhas não são iguais.');
        };

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password,
        }).then(() => {
            navigation.navigate('Confirmation', {
                title: 'Conta criada!',
                message: `Agora é só fazer login\ne aproveitar.`,
                nextScreenRoute: 'SignIn'
            });
        }).catch(() => Alert.alert('Opa', 'Não foi possível cadastrar.'));

    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />
                        <Steps>
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>Crie sua{'\n'}Conta</Title>

                    <SubTitle>
                        Faça seu cadastro de{'\n'}
                        Forma rápida e fácil.
                    </SubTitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>

                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={SetPassword}
                            value={password}
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Repetir Senha'
                            onChangeText={SetPasswordConfirm}
                            value={passwordConfirm}
                        />

                    </Form>

                    <Button
                        title='Cadastrar'
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}