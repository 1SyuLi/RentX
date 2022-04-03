import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, } from '@react-navigation/native';
import { Alert, StatusBar, TouchableOpacity, } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { LoadAnimation } from '../../Components/LoadAnimation';

import { Car } from '../../Components/Car';

import { api } from '../../services/api';
import { carDTO } from '../../dtos/carDto';

import { useNetInfo } from '@react-native-community/netinfo';

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

    const netInfo = useNetInfo();
    const navigation = useNavigation<any>();

    function handleCarDetails(car: carDTO) {
        navigation.navigate('CarDetails', { car });
    };

    useEffect(() => {

        let isMounted = true;

        async function fetchCars() {

            try {
                const response = await api.get('/cars');
                if (isMounted) {
                    setCars(response.data);
                }

            } catch (error) {
                console.log(error);

            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCars();
        return () => {
            isMounted = false;
        }
    }, []);

    useEffect(() => {
        if (netInfo.isConnected) {
            Alert.alert('Internet', 'Você está com internet!');
        } else {
            Alert.alert('Internet', 'Você está sem internet!');
        }
    }, [netInfo.isConnected]);


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