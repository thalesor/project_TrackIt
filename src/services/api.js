import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL});

async function getTodayHabitsData(token)
{
  const responseObj = await api.get(`/habits/today`, {
    headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return responseObj;
}

async function getHabits(token)
{
  const responseObj = await api.get(`/habits`, {
    headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return responseObj;
}

async function updateHabitStatus(token, id, instruction)
{
  const responseObj = await api.post(`/habits/${id}/${instruction}`, null, {
    headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return responseObj;
}

async function login(data)
{
  const responseObj = await api.post(`/auth/login`, data);
    return responseObj;
}

async function signUp(data)
{
  const responseObj = await api.post(`/auth/sign-up`, data);
    return responseObj;
}

async function postHabit(data, token)
{
  const responseObj = await api.post(`/habits`, data, {
    headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return responseObj;
}

async function deleteHabit(id, token)
{
  const responseObj = await api.delete(`/habits/${id}`, {
    headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return responseObj;
}

export {
    getTodayHabitsData,
    login,
    signUp,
    getHabits,
    deleteHabit,
    postHabit,
    updateHabitStatus
};