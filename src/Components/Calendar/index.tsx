import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { generateInterval } from './generateInterval';

import {
    Calendar as CustomCalendar,
    LocaleConfig,


} from 'react-native-calendars';

import { ptBr } from './localeConfig';



LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

type DateData = {
    year: number;
    month: number;
    day: number;
    timestamp: number;
    dateString: string;
}

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

interface MarkedDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disabledTouchEvent?: boolean;
    };
}

interface CalendarProps {
    markedDate: MarkedDateProps;
    onDayPress?: (date: DateData) => void;
}

function Calendar({ markedDate, onDayPress }: CalendarProps) {

    const theme = useTheme();

    return (
        <CustomCalendar
            renderArrow={(direction) =>
                <Feather
                    size={24}
                    color={theme.colors.text}
                    name={direction === 'left' ? "chevron-left" : "chevron-right"}
                />
            }

            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 10,
                marginBottom: 10,
            }}

            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textDayHeaderFontSize: 10,
                textMonthFontSize: 20,
                textMonthFontFamily: theme.fonts.secondary_600,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15,
                }
            }}

            firstDay={1}
            minDate={String(new Date())}
            markingType="period"
            markedDates={markedDate}
            onDayPress={onDayPress}
        />
    );
}


export { Calendar, MarkedDateProps, DayProps, generateInterval };