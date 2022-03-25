import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '../../Components/Button';
import { Input } from './Input';

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

    return (
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
                <Input iconName='mail' />
            </Form>

            <Footer>
                <Button
                    title='Login'
                    disable={true}
                    onPress={() => { }}
                    loading={false}
                />

                <Button
                    title='Criar conta gratuita'
                    color={theme.colors.background_secondary}
                    light
                    disable={false}
                    onPress={() => { }}
                    loading={false}
                />
            </Footer>
        </Container>
    );
}