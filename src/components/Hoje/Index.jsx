import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from "../../contexts/UserContext";
import checked from '../../assets/checked.png';
import beach from '../../assets/beach.jpg';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { Container, HeaderBox, DoneInfo, ContentBox, HabitoBox, HabitoGroup, SpanGroup, Span, DoneButton, Beach }
from './Styles';

const Hoje = () =>
{
    dayjs.locale('pt-br');
    const { userData, todayProgressState, getTodayProgress } = useContext(UserContext);
    const [todayHabitsList, setTodayHabitsList] = useState(null);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    }

    const toggleHabit = (id, status) =>
    {
        const instruction = status ? 'uncheck' : 'check';
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${instruction}`, null, config)
        .then(response => {
            getTodayHabitsList();
        })
    }

      
    const getTodayHabitsList = () =>
    {
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`,config)
        .then(response => {
        setTodayHabitsList(response.data);
        })
    }
    
    useEffect(() => {
        getTodayHabitsList();
    }, [])

    useEffect(() => {
        getTodayProgress();
    }, [todayHabitsList])

    const today = dayjs().format('dddd, DD/MM'); 
    return <Container>
        <HeaderBox>
            <h1>{today}</h1>
            {
                todayHabitsList?.length ? (todayProgressState > 0 ? <DoneInfo colored>{todayProgressState}% dos hábitos concluídos</DoneInfo> : <DoneInfo>Nenhum hábito concluído ainda</DoneInfo>) : <DoneInfo>Não há hábitos para hoje, aproveite para descansar :D</DoneInfo>    
            }
        </HeaderBox>
        <ContentBox>
        {todayHabitsList?.length 
        ? 
        todayHabitsList.map((habito) => 
        {
            return (
                <HabitoBox key={habito.id}>
                    <HabitoGroup>
                        <h1>{habito.name}</h1>
                        <SpanGroup><Span>Sequência atual:</Span> <Span colored={habito.done ? true : false}>{habito.currentSequence} dias</Span></SpanGroup>
                        <SpanGroup><Span>Seu recorde:</Span> <Span colored={habito.currentSequence === habito.highestSequence && habito.currentSequence > 0 ? true : false}>{habito.highestSequence} dias</Span></SpanGroup>
                    </HabitoGroup>
                    <DoneButton done={habito.done ? true : false} onClick={()=> toggleHabit(habito.id, habito.done)}>
                        <img src={checked} alt="checked" />
                    </DoneButton>
                </HabitoBox>
            );
        })
    : <Beach>
        <img src={beach} alt="beach" />
      </Beach>
    }
        </ContentBox>
    </Container>
    
}


export default Hoje;