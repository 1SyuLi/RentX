import React from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../Components/BackButton';
import { Bullet } from '../../../Components/Bullet';
import { PasswordInput } from '../../SignIn/PasswordInput';
import { Button } from '../../../Components/Button';


import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';


export function SignUpSecondStep() {

    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
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
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Repetir Senha'
                        />

                    </Form>

                    <Button title='Cadastrar' color={theme.colors.success} />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}