import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useGlobal from '../../hooks/useGlobal';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import 'react-calendar/dist/Calendar.css';
import { Container, HeaderBox, ContentBox, DayLabel }
from './Styles';
import Calendar from 'react-calendar';

const Historico = () =>
{
    dayjs.locale('pt-br');
    const { auth, displayMessage } = useGlobal();
    const [calendarData, setCalendarData] = useState(null);
    const config = {
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    }

    const getHabitsDataCalendar = () =>
    {
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily`,config)
        .then(response => {
            if(response.data.length)
            setCalendarData(response.data);
        })
    }
    
    useEffect(() => {
        getHabitsDataCalendar();
    }, [])

    const format = (locale, data) =>
    {

        let day = calendarData.find(d=> d.day === dayjs(data).format('DD/MM/YYYY'));
        
        if(day)
        {   
            const habits = day.habits;
            if(habits.length)
            {
                const doneHabits = habits.filter(h=> h.done);
                let message = habits.map((h) => 
                {
                    return `${h.name} - ${h.done ? 'Concluído' : 'não concluído'}`;
                });
                message  = message.join('\r\n');
                const messageConfig = 
                {
                    showCancel : false,
                    message: message,
                    type: 'info',
                    confirmBtnText: 'Ok',
                    title: 'Hábitos do dia'
                };
                
                if(doneHabits.length === habits.length)
                {
                    return <DayLabel onClick={()=> displayMessage(messageConfig)}><span className='success'>{dayjs(data).format('D')}</span></DayLabel>
                }
                else
                return <DayLabel onClick={()=> displayMessage(messageConfig)}><span className='danger'>{dayjs(data).format('D')}</span></DayLabel>
            }
        }
        else
        return <DayLabel>{dayjs(data).format('D')}</DayLabel>
    }

    const today = dayjs().format('dddd, DD/MM'); 
    return <Container>
        <HeaderBox>
            <h1>Histórico</h1>
        </HeaderBox>
        <ContentBox>
            {calendarData
             ? <Calendar formatDay={format} className='calendar'></Calendar>
            : <h1>Em breve você poderá ver o histórico dos seus hábitos aqui!</h1>
        }
        </ContentBox>
    </Container>
    
}


export default Historico;