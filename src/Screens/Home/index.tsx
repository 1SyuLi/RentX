import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/logo.svg';

import { Car } from '../../Components/Car';
import { Load } from '../../Components/Load';

import { api } from '../../services/api';
import { carDTO } from '../../dtos/carDto';



import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CardList,
    MycarsButton
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
    }

    function handleOpenMycars() {
        navigation.navigate('Mycars');
    }


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

                    <TotalCars>
                        Total de {cars.length} carros
                    </TotalCars>
                </HeaderContent>
            </Header>


            {
                loading === true ? <Load /> :
                    <CardList data={cars} keyExtractor={item => item.id}
                        renderItem={
                            ({ item }) => <Car onPress={() => handleCarDetails(item)} data={item} />
                        }
                    />
            }

            <MycarsButton onPress={handleOpenMycars}>
                <Ionicons
                    name='ios-car-sport'
                    size={32}
                    color={theme.colors.shape}
                />
            </MycarsButton>

        </Container>
    );
}