import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, } from '@react-navigation/native';
import { StatusBar, TouchableOpacity, } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { LoadAnimation } from '../../Components/LoadAnimation';

import { Car } from '../../Components/Car';

import { api } from '../../services/api';
import { carDTO } from '../../dtos/carDto';

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CardList,
} from './styles';



export function Home() {

    const [cars, setCars] = useState<carDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    useEffect(() => {
        async function fetchCars() {

            try {
                const response = await api.get('/cars');
                setCars(response.data);

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);

            }
        }


        fetchCars();
    }, []);

    const navigation = useNavigation<any>();

    function handleCarDetails(car: carDTO) {
        navigation.navigate('CarDetails', { car });
    };


    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />

                    {
                        !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }

                </HeaderContent>
            </Header>


            {
                loading === true ? <LoadAnimation /> :
                    <CardList data={cars} keyExtractor={item => item.id}
                        renderItem={
                            ({ item }) => <Car onPress={() => handleCarDetails(item)} data={item} />
                        }
                    />
            }


        </Container>
    );
}