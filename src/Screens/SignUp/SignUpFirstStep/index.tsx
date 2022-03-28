import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../Components/BackButton';
import { Bullet } from '../../../Components/Bullet';


import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';


export function SignUpFirstStep() {

    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    return (
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
                <FormTitle>1. Dados</FormTitle>
            </Form>
        </Container>
    );
}