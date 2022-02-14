import React from 'react';
import { useNavigation } from '@react-navigation/native';


import { StatusBar } from 'react-native';

import { BackButton } from '../../Components/BackButton';
import { useTheme } from 'styled-components';
import { Button } from '../../Components/Button';
import { Calendar } from '../../Components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';



import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';

export function Scheduling() {

    const theme = useTheme();
    const navigation = useNavigation<any>();


    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header>
                <BackButton
                    onPress={() => navigation.goBack()}
                    color={theme.colors.shape}
                />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}>11/02/2022</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={false}>11/02/2022</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button title='Confirmar' onPress={() => navigation.navigate('SchedulingDetails')} />
            </Footer>
        </Container>
    );
}