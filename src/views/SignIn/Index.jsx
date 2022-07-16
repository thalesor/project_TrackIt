import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import { displayMessage, displayToast } from '../Message';
import useGlobal from '../../hooks/useGlobal';
import {    
    Container,
    Form,
    Input,
    Button,
    LinkTag 
} from './Styles';

import * as api from '../../services/api';

const SignIn = () =>
{
    let navigate = useNavigate();
    
    const [isFormActive, setIsFormActive] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { auth, login } = useGlobal();

    useEffect(() => {
        if(auth && auth.token)
        {
            navigate('/hoje');
        }
    }, [])

async function onSignIn(e)
{
    e.preventDefault();
    setIsFormActive(false);
    try
    {
        const promise = await api.login(formData);
        login(promise.data);
        displayToast('success', `Seja bem-vindo ${promise.data.name}`);
        navigate('/hoje'); 
    }
    catch(err)
    {
        displayMessage("error", "Falha", err.response.data.message);
        setIsFormActive(true);
    }
}

const onInputChange = (e) => 
{
    setFormData({...formData, 
    [e.target.name]: e.target.value});
}

    return <Container>
      <img src={logo} alt="" />
      <Form onSubmit={onSignIn}>
        <Input type="email" autoComplete='false' disabled={isFormActive ? false : true} name='email' onChange={onInputChange} value={formData.email} placeholder="email" required></Input>
        <Input type="password" autoComplete='false' disabled={isFormActive ? false : true} name='password' onChange={onInputChange} value={formData.password} placeholder="senha" required></Input>
        <Button type="submit" disabled={isFormActive ? false : true}>
        {isFormActive 
        ? 'Entrar' 
        :
        <Loader type="Rings" color="#FFFFFF" height={70} width={80} />
        }
        </Button>
        <LinkTag to={`/cadastro`}>
           Não tem uma conta? Cadastre-se!
         </LinkTag>
      </Form>
    </Container>
    
}


export default SignIn;