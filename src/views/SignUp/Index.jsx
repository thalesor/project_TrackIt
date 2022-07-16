import React, { useState, useContext } from 'react';
import logo from '../../assets/logo.png';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import useGlobal from '../../hooks/useGlobal';
import { Container, Form, Input, Button, LinkTag } from './Styles';
import { signUp } from '../../services/api';

const SignUp = () =>
{
    const [isFormActive, setIsFormActive] = useState(true);
    const { displayMessage, displayToast } = useGlobal();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        image: '',
        password: ''
    })
    let navigate = useNavigate();

    async function onSignUp(e)
    {
        e.preventDefault();
        setIsFormActive(false);
        try
        {
            const result = await signUp(formData);
            displayToast('success', `Sucesso!
            Você foi cadastrado`);
            navigate('/');
        }
        catch(error)
        {
            displayMessage('error', 'Falha', error.response.data);
        }
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