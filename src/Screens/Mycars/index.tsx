import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StatusBar } from 'react-native';

import { useTheme } from 'styled-components';

import { BackButton } from '../../Components/BackButton';
import { Car } from '../../Components/Car';

import { api } from '../../services/api';
import { carDTO } from './../../dtos/carDTO';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,

} from './styles';

interface CarsProps {
    id: string;
    user_id: string;
    car: carDTO;
}


export function Mycars() {

    const [cars, setCars] = useState<CarsProps[]>([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    const navigation = useNavigation();


    useEffect(() => {
        async function fetchCars() {
            try {

                const response = await api.get('/schedules_byuser?user_id=1');
                console.log(response.data);
                setCars(response.data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, []);

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

                <SubTitle>
                    Conforto, segurança e praticidade
                </SubTitle>
            </Header>


            <Content>
                <Appointments>
                    <AppointmentsTitle>
                        Agendamentos Feitos
                    </AppointmentsTitle>

                    <AppointmentsQuantity>05</AppointmentsQuantity>
                </Appointments>


                <FlatList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Car data={item.car} />}
                />

            </Content>


        </Container>
    );
}