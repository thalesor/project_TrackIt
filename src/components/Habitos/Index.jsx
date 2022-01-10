import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from "../../contexts/UserContext";
import Loader from "react-loader-spinner";
import trash from '../../assets/trash-icon.png';

import { Container, FlexBox, Form, Input, ButtonGroup, DayButton, SubmitGroup, HabitosGroup, HabitoBox,
TrashButton, Message } from './Styles';

const Habitos = () =>
{
    const [habitosList, setHabitosList] = useState(null);
    const { userData, getTodayProgress, displayMessage, hideMessage } = useContext(UserContext);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormActive, setIsFormActive] = useState(true);

    const formInitialState = {
        name: '',
        days: 
        [
            {
                name: 'D',
                id: '7',
                value: false
            },
            {
                name: 'S',
                id: '1',
                value: false
            },
            {
                name: 'T',
                id: '2',
                value: false
            },
            {
                name: 'Q',
                id: '3',
                value: false
            },
            {
                name: 'Q',
                id: '4',
                value: false
            },
            {
                name: 'S',
                id: '5',
                value: false
            },
            {
                name: 'S',
                id: '6',
                value: false
            }
        ]
    }

    const [formData, setFormData] = useState(formInitialState);

    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    const getHabits = () =>
    {
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config)
        .then(response => {
        setHabitosList(response.data);
        })
    }

    const onDeleteHabito = (habit, id) =>
    {
        const messageConfig = 
        {
            showCancel : true,
            message: `Está certo de que deseja deletar o hábito ${habit}?`,
            type: 'warning',
            cancelBtnText: 'Ainda não',
            confirmBtnText: 'Desejo deletar',
            title: 'Aviso!',
            fn: ()=> deleteHabit(id)
        };
        displayMessage(messageConfig);
    }

    const deleteHabit = (idHabito) =>
    {
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}`,config)
        .then(response => {
            hideMessage();
            getHabits();
        }) 
    }

    useEffect(() => {
        getHabits();
    }, [])

    useEffect(() => {
        getTodayProgress();
    }, [habitosList])

    const onInputChange = (e) =>
    {
        setFormData({...formData, 
        name: e.target.value});
    }

    const onDayButtonChange = (id) => 
    {
        if(isFormActive)
        {
            const newArrayDays = [...formData.days];
            let selectedDay = newArrayDays.find(day => day.id === id);
            if(selectedDay.value)
            selectedDay.value = false;
            else
            selectedDay.value = true; 
            setFormData({...formData, days: newArrayDays})
        }
    }

    const onFormReset = () =>
    {
        setIsFormVisible(false);
    }

    const onFormSubmit = (e) =>
    {
        e.preventDefault();
        const selectedDays = formData.days.filter(day => day.value === true);
        if(selectedDays.length)
        {
            setIsFormActive(false);
            const daysObj = [];
            selectedDays.forEach(d=> daysObj.push(d.id));
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, 
            {
                name: formData.name,
                days: daysObj
            }, config)
            .then(response => {
                setIsFormActive(true);
                onFormReset();
                setFormData(formInitialState);
                getHabits();
            }).catch(() =>
            {
                setIsFormActive(true);
                alert('erro ao cadastrar, reveja os dados e tente novamente');
            });
        }
        else
        {
            const messageConfig = 
            {
                showCancel : false,
                message: 'Precisa selecionar pelo menos um dia para registrar o hábito',
                type: 'warning',
                confirmBtnText: 'Ok',
                title: 'Aviso!'
            };
            displayMessage(messageConfig);
        }
    }

    return <Container>
        <FlexBox>
            <h1>Meus hábitos</h1>
            { isFormVisible || <button onClick={()=> setIsFormVisible(true)}>+</button> }
        </FlexBox>
        { isFormVisible && 
        <Form onSubmit={onFormSubmit}>
            <Input type="text" onChange={onInputChange} value={formData.name} placeholder="nome do hábito" disabled={isFormActive ? false : true} name='name'></Input>
            <ButtonGroup>
            {
                formData.days.map((day) => 
                {
                    return (
                        <DayButton onClick={()=> onDayButtonChange(day.id)} key={day.id} active={ day.value ? true : false } type='button'>{day.name}</DayButton>
                    );
                })
            }
            </ButtonGroup>
            <SubmitGroup>
                <button onClick={()=> onFormReset()} className='cancel' disabled={isFormActive ? false : true} type='button' >Cancelar</button>
                <button type="submit" className='submit' disabled={isFormActive ? false : true}>
                {isFormActive 
                ? 'Salvar' 
                :
                <Loader type="Rings" color="#FFFFFF" height={70} width={80} />
                }
                </button>
            </SubmitGroup>
        </Form>
        }
        {habitosList?.length 
        ? <HabitosGroup>
        {
        habitosList.map((habito) => 
            {
                return (
                    <HabitoBox>
                        <TrashButton onClick={()=> onDeleteHabito(habito.name, habito.id)} src={trash}></TrashButton>
                        <span>{habito.name}</span>
                        <ButtonGroup>
                            <DayButton active={habito.days.includes(7) ? true : false } type='button'>D</DayButton>
                            <DayButton active={habito.days.includes(1) ? true : false } type='button'>S</DayButton>
                            <DayButton active={habito.days.includes(2) ? true : false } type='button'>T</DayButton>
                            <DayButton active={habito.days.includes(3) ? true : false } type='button'>Q</DayButton>
                            <DayButton active={habito.days.includes(4) ? true : false } type='button'>Q</DayButton>
                            <DayButton active={habito.days.includes(5) ? true : false } type='button'>S</DayButton>
                            <DayButton active={habito.days.includes(6) ? true : false } type='button'>S</DayButton>
                        </ButtonGroup>
                    </HabitoBox>
                );
            })
        }
        </HabitosGroup>
        : <Message>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Message>
    }
    </Container>
    
}


export default Habitos;