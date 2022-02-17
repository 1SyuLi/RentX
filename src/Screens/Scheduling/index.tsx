import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { getPlatformDate } from '../../utils/getPlatformDate';
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
import { carDTO } from '../../dtos/carDto';



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



interface ParamsProps {
    car: carDTO
}

interface RentalPeriodProps {
    startFormatted: string;
    endFormatted: string;
}

export function Scheduling() {

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDate, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);

    const theme = useTheme();

    const route = useRoute();
    const { car } = route.params as ParamsProps;


    const navigation = useNavigation<any>();

    function handleConfirmScheduling() {

        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDate)
        })

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

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
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
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
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
                <Button
                    title='Confirmar'
                    onPress={handleConfirmScheduling}
                    disable={!rentalPeriod.startFormatted}
                />
            </Footer>
        </Container>
    );
}