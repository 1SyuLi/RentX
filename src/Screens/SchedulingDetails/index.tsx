import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';
import { Accessory } from '../../Components/Accessory';
import { Button } from '../../Components/Button';

import { getAcessoryIcon } from '../../utils/getAcessoryIcon';
import { carDTO } from '../../dtos/carDto';
import { getPlatformDate } from './../../utils/getPlatformDate';

import { api } from '../../services/api';

import {
    Container,
    Header,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,

} from './styles';



interface ParamsProps {
    car: carDTO,
    dates: string,
}

interface RentalPeriodProps {
    start: string;
    end: string;
}


export function SchedulingDetails() {

    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);
    const [loading, setLoading] = useState(false);


    const theme = useTheme();

    const route = useRoute();
    const { car, dates } = route.params as ParamsProps;

    const navigation = useNavigation<any>();


    const rentalTotal = Number(dates.length * car.price);

    async function handleCompleteRental() {

        setLoading(true);

        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);


        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
        ]

        await api.post('/schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates,
        })
            .then(() => navigation.navigate('Confirmation', {
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
                nextScreenRoute: 'Home'
            }))
            .catch(() => {
                Alert.alert('Não foi possivel confirmar o agendamento');
                setLoading(false);
            });
    }


    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, []);


    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
            />


            <Header>
                <BackButton onPress={() => navigation.goBack()} />
            </Header>


            <ImageSlider
                imagesUrl={car.photos}
            />

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>{car.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAcessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title='Alugar agora'
                    color={theme.colors.success}
                    onPress={handleCompleteRental}
                    disable={loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
}