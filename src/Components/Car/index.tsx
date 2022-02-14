import React from 'react';
import { ButtonProps, TouchableOpacityProps } from 'react-native';
import { RectButtonProps, TouchableOpacity } from 'react-native-gesture-handler';
import Gasoline from '../../assets/gasoline.svg';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './styles';

interface CarData {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    },
    thumbnail: string;
}

interface Props extends TouchableOpacityProps {
    data: CarData;
}



export function Car({ data, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <Gasoline
                        // width={20}
                        // height={20}
                        />
                    </Type>
                </About>
            </Details>


            <CarImage
                source={{ uri: data.thumbnail }}
                resizeMode='contain'
            />

        </Container>
    );
}