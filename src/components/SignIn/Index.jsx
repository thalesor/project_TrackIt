import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";

import { Container, Form, Input, Button, LinkTag } from './Styles';

const SignIn = () =>
{
    const { setUserData, displayMessage } = useContext(UserContext);
    let navigate = useNavigate();
    
    const [isFormActive, setIsFormActive] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(localStorage.getItem("userData"))
        {
            navigate('/hoje');
        }
    }, [])

const onSignIn = (e) =>
{
    e.preventDefault();
    setIsFormActive(false);
    axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`, 
    formData)
    .then(response => {
        const userObj = {
            image: response.data.image,
            name: response.data.name,
            token: response.data.token
        }
        localStorage.setItem("userData", JSON.stringify(userObj));
        setUserData(userObj);
        navigate("/hoje"); 
    }).catch((error) => 
    {
        const messageConfig = 
        {
            showCancel : false,
            message: 'Não existe usuário cadastrado para os dados digitados',
            type: 'error',
            confirmBtnText: 'Ok',
            title: 'Erro de autenticação'
        };
        displayMessage(messageConfig);
        setIsFormActive(true);
    })
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