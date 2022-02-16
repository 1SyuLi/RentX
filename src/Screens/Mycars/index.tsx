import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';


import { carDTO } from './../../dtos/carDTO';

import {
    Container
} from './styles';

export function Mycars() {

    const [cars, setCars] = useState<carDTO[]>([]);
    const [loading, setLoading] = useState(true);


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

        </Container>
    );
}