import * as api from '../../services/api';

import { displayMessage, displayToast } from '../Message';

export const formInitialState = {
    name: '',
    days: 
    [
        {
            name: 'D',
            id: 7,
            value: false
        },
        {
            name: 'S',
            id: 1,
            value: false
        },
        {
            name: 'T',
            id: 2,
            value: false
        },
        {
            name: 'Q',
            id: 3,
            value: false
        },
        {
            name: 'Q',
            id: 4,
            value: false
        },
        {
            name: 'S',
            id: 5,
            value: false
        },
        {
            name: 'S',
            id: 6,
            value: false
        }
    ]
}

export async function getAllHabits(token, setHabitosList, setPageLoaded)
    {
        const result = await api.getHabits(token);
        setHabitosList(result.data);
        setPageLoaded(true);
    }

    export const onDeleteHabito = (habit, id, token, setHabitosList, setPageLoaded, getTodayProgress) =>
    {
        displayMessage('warning', 'Alerta', `Tem certeza que deseja deletar 
        ${habit}?`, ()=> deleteAHabit(id, token, setHabitosList, setPageLoaded, getTodayProgress), true);
    }

    export async function deleteAHabit(idHabito, token, setHabitosList, setPageLoaded, getTodayProgress)
    {
        try {
            await api.deleteHabit(idHabito, token);
            updateTodayProgress(token, getTodayProgress);
            getAllHabits(token, setHabitosList, setPageLoaded);
        }
        catch(error)
        {
            console.log(error);
            displayMessage('error', 'Falha', error.response.data);
        }
    }

    export async function updateTodayProgress(token, getTodayProgress)
    {
        try {
            const promise = await api.getTodayHabitsData(token);
            getTodayProgress(promise.data);
        }
        catch(err)
        {
            console.log(err);
            displayMessage("error", "Falha", err.response?.data.message);
        }
    }

    export const onInputChange = (e, formData, setFormData) =>
    {
        setFormData({...formData, 
        name: e.target.value});
    }

    export const onDayButtonChange = (id, formData, setFormData, isFormActive) => 
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

    export const onFormReset = (setIsFormVisible) =>
    {
        setIsFormVisible(false);
    }

    export async function onFormSubmit(e, formData, setFormData, setIsFormActive, setIsFormVisible, token, setHabitosList, setPageLoaded)
    {
        e.preventDefault();
        const selectedDays = formData.days.filter(day => day.value === true);
        if(selectedDays.length)
        {
            setIsFormActive(false);
            const daysObj = [];
            selectedDays.forEach(d=> daysObj.push(d.id));
            try
            {
                await api.postHabit({ name: formData.name,days: daysObj }, token);  

                setIsFormActive(true);
                onFormReset(setIsFormVisible);
                setFormData(JSON.parse(JSON.stringify(formInitialState)));
                displayToast('success', 'O hábito foi adicionado');
                getAllHabits(token, setHabitosList, setPageLoaded);
            }
            catch(err)
            {
                console.log(err);
                displayMessage("error", "Falha", err.response.data);
                setIsFormActive(true);
            }
            return;
        }
        displayMessage('info', 'Aviso', 'Precisa selecionar pelo menos um dia para adicionar o hábito');
    }

