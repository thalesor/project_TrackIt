import React, { useState, useContext } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";

import { Container, Form, Input, Button, LinkTag } from './Styles';

const SignUp = () =>
{
    const [isFormActive, setIsFormActive] = useState(true);
    const { displayMessage } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        image: '',
        password: ''
    })
    let navigate = useNavigate();


    const onSignUp = (e) =>
    {
        e.preventDefault();
        setIsFormActive(false);
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`, 
        formData)
        .then(response => {
            navigate("/"); 
        }).catch((error) => 
        {
        const messageConfig = 
        {
            showCancel : false,
            message: 'Reveja os dados e tente novamente',
            type: 'error',
            confirmBtnText: 'Ok',
            title: 'Erro ao cadastrar'
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
      <Form onSubmit={onSignUp}>
        <Input type="email" autoComplete='false' disabled={isFormActive ? false : true} name='email' onChange={onInputChange} value={formData.email} placeholder="email" required></Input>
        <Input type="password" autoComplete='false' disabled={isFormActive ? false : true} name='password' onChange={onInputChange} value={formData.password} placeholder="senha" required></Input>
        <Input type="text" autoComplete='false' onChange={onInputChange} value={formData.name} placeholder="nome" disabled={isFormActive ? false : true} name='name'></Input>
        <Input type="text" autoComplete='false' placeholder="foto" onChange={onInputChange} value={formData.image} disabled={isFormActive ? false : true} name='image'></Input>
        <Button type="submit" disabled={isFormActive ? false : true}>
        {isFormActive 
        ? 'Cadastrar' 
        :
        <Loader type="Rings" color="#FFFFFF" height={70} width={80} />
        }
        </Button>
        <LinkTag to={`/`}>
           Já tem uma conta? Faça login!
         </LinkTag>
      </Form>
    </Container>
}

export default SignUp;