import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


import { StatusBar } from 'react-native';

import { BackButton } from '../../Components/BackButton';
import { useTheme } from 'styled-components';
import { Button } from '../../Components/Button';

import {
    Calendar,
    DayProps,
    MarkedDateProps,
    generateInterval
} from '../../Components/Calendar';

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

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDate, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);

    const theme = useTheme();


    const navigation = useNavigation<any>();

    function handleConfirmScheduling() {
        navigation.navigate('SchedulingDetails')
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDate(interval);

    }

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
                <Calendar
                    markedDate={markedDate}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button title='confirmar' onPress={handleConfirmScheduling} />
            </Footer>
        </Container>
    );
}