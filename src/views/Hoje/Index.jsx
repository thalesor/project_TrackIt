import React, { useState, useEffect} from 'react';
import checked from '../../assets/checked.png';
import beach from '../../assets/beach.jpg';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { displayMessage } from '../Message';
import useGlobal from '../../hooks/useGlobal';
import * as api from '../../services/api';
import { Placeholder } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { Container, PlaceHolderBox, HeaderBox, DoneInfo, ContentBox, HabitoBox, HabitoGroup, SpanGroup, Span, DoneButton, Beach }
from './Styles';

const Hoje = () =>
{
    dayjs.locale('pt-br');
        const { auth, todayProgressState, getTodayProgress} = useGlobal();
        const [pageLoaded, setPageLoaded] = useState(false);
    const [todayHabitsList, setTodayHabitsList] = useState(null);

    async function toggleHabit(id, status)
    {
        try {
            const instruction = status ? 'uncheck' : 'check';
            await api.updateHabitStatus(auth.token, id, instruction);
            getTodayHabitsList(auth.token);
        } catch (err) {
            displayMessage("error", "Falha", err.response.data.message);
        }
    }
      
    async function getTodayHabitsList(token)
    {
        try {
            const promise = await api.getTodayHabitsData(token);
            setTodayHabitsList(promise.data);
            setPageLoaded(true);
        }
        catch(err)
        {
            displayMessage("error", "Falha", err.response.data.message);
        }
    }
    
    useEffect(() => {
        getTodayHabitsList(auth.token);
    }, [])

    useEffect(async() => {
        if (auth && auth.token) {
            const promise = await api.getTodayHabitsData(auth.token);
            getTodayProgress(promise.data);
          }
    }, [todayHabitsList])

    const today = dayjs().format('dddd, DD/MM'); 
    const { Paragraph } = Placeholder;

    const placeHolderItems = [];
    for(let i = 0; i < 6; i++)
    placeHolderItems.push(
    <HabitoBox>
        <Paragraph rows={3} graph="image" active />
    </HabitoBox>);

    return pageLoaded ? (<Container>
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
    )
    :
    <Container>
        <PlaceHolderBox>
           {placeHolderItems} 
        </PlaceHolderBox>
    </Container>
    
}


export default Hoje;