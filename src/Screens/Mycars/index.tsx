import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StatusBar } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Load } from '../../Components/Load';
import { BackButton } from '../../Components/BackButton';
import { Car } from '../../Components/Car';

import { api } from '../../services/api';
import { carDTO } from './../../dtos/carDTO';

import { LoadAnimation } from '../../Components/LoadAnimation';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface CarsProps {
    id: string;
    user_id: string;
    car: carDTO;
    startDate: string;
    endDate: string;
}


export function Mycars() {

    const [cars, setCars] = useState<CarsProps[]>([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    const navigation = useNavigation();
    const { user } = useAuth();


    useEffect(() => {
        async function fetchCars() {
            try {

                const response = await api.get(`/schedules_byuser?user_id=${user.id}`);
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

            {loading ? <LoadAnimation /> :
                <Content>
                    <Appointments>
                        <AppointmentsTitle>
                            Agendamentos Feitos
                        </AppointmentsTitle>

                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>


                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name='arrowright'
                                            size={20}
                                            color={theme.colors.title}
                                            style={{
                                                marginHorizontal: 10,
                                            }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        }
                    />

                </Content>
            }
        </Container>
    );
}