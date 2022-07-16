import React, { useState, useEffect} from 'react';
import useGlobal from '../../hooks/useGlobal';
import Loader from "react-loader-spinner";
import trash from '../../assets/trash-icon.png';
import { Container, FlexBox, Form, Input, ButtonGroup, DayButton, SubmitGroup, HabitosGroup, HabitoBox,
TrashButton, Message } from './Styles';
import { Placeholder } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import * as utils from './functions';

const Habitos = () =>
{
    const { auth, getTodayProgress } = useGlobal();
    const [pageLoaded, setPageLoaded] = useState(false);
    const [habitosList, setHabitosList] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormActive, setIsFormActive] = useState(true);
    //JSON parse serve para copiar um objeto pelo valor e não pela referência.
    const [formData, setFormData] = useState(JSON.parse(JSON.stringify(utils.formInitialState)));

    useEffect(() => {
        utils.getAllHabits(auth.token, setHabitosList, setPageLoaded);
    }, [])
        
    useEffect(() => {
       utils.updateTodayProgress(auth.token, getTodayProgress);
    }, [habitosList])

    const { Paragraph } = Placeholder;

    const placeHolderItems = [];
    for(let i = 0; i < 6; i++)
    placeHolderItems.push(
    <HabitoBox>
        <Paragraph rows={3} graph="image" active />
    </HabitoBox>);

    return <Container>
        <FlexBox>
            <h1>Meus hábitos</h1>
            { isFormVisible || <button onClick={()=> setIsFormVisible(true)}>+</button> }
        </FlexBox>
        { isFormVisible && 
        <Form onSubmit={(e) => utils.onFormSubmit(e, formData, setFormData, setIsFormActive, setIsFormVisible, auth.token, setHabitosList, setPageLoaded)}>
            <Input type="text" onChange={(e) => utils.onInputChange(e, formData, setFormData)} value={formData.name} placeholder="nome do hábito" disabled={isFormActive ? false : true} name='name'></Input>
            <ButtonGroup>
            {
                formData.days.map((day) => 
                {
                    return (
                        <DayButton onClick={()=> utils.onDayButtonChange(day.id, formData, setFormData, isFormActive)} key={day.id} active={ day.value ? true : false } type='button'>{day.name}</DayButton>
                    );
                })
            }
            </ButtonGroup>
            <SubmitGroup>
                <button onClick={()=> utils.onFormReset(setIsFormVisible)} className='cancel' disabled={isFormActive ? false : true} type='button' >Cancelar</button>
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
        {pageLoaded ? 
        (habitosList?.length 
        ? <HabitosGroup>
        {
        habitosList.map((habito) => 
            {
                return (
                    <HabitoBox>
                        <TrashButton onClick={()=> utils.onDeleteHabito(habito.name, habito.id, auth.token, setHabitosList, setPageLoaded, getTodayProgress)} src={trash}></TrashButton>
                        <span>{habito.name}</span>
                        <ButtonGroup>
                        {utils.formInitialState.days.map((d) => 
                           { return <DayButton active={habito.days.includes(d.id) ? true : false } type='button'>{d.name}</DayButton> })
                        }
                        </ButtonGroup>
                    </HabitoBox>
                );
            })
        }
        </HabitosGroup>
        : <Message>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Message>)

        : (
            <HabitosGroup>
                {placeHolderItems}
            </HabitosGroup>
        )
    }
    </Container>
    
}

export default Habitos;