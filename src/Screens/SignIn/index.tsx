import React, { useState } from 'react';
import * as Yup from 'yup';

import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../Components/Button';
import { Input } from './Input';
import { PasswordInput } from './PasswordInput';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer,
} from './styles';


export function SignIn() {

    const theme = useTheme();
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useAuth();

    async function handleSignIn() {

        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Informe um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate({ email, password });
            signIn({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message)
            } else {
                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer login, verefique as credênciais'
                );
            }
        }

    }

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep')
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
                    <Header>
                        <Title>Estamos{'\n'}Quase lá</Title>
                        <SubTitle>
                            Faça seu login para começar{'\n'}
                            uma experiência incrível.
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            disable={false}
                            onPress={handleSignIn}
                            loading={false}
                        />

                        <Button
                            title='Criar conta gratuita'
                            color={theme.colors.background_secondary}
                            light
                            disable={false}
                            onPress={handleNewAccount}
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}