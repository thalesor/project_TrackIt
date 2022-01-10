import style from 'styled-components';
import { Link } from 'react-router-dom';

const Container = style.div`
    background-color: #FFFFFF;
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img
    {
        width: 180px;
        height: 178.38px;
    }
`;

const Form = style.form`
    width: 303px;
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Input = style.input`
    width: 100%;
    padding: 10px;
    height: 45px;
    background-color: ${(props) => props.disabled ?
    "#F2F2F2" : "#FFFFFF"};
    color: ${(props) => props.disabled &&
    "#AFAFAF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 19.976px;
    outline: 0;
    cursor: ${(props) => props.disabled && "not-allowed"};
    &::placeholder {
        color: #DBDBDB;
    }
`;

const Button = style.button`
    width: 100%;
    height: 45px;
    background-color: #52B6FF;
    border-radius: 4.63636px;
    outline: 0;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    opacity: ${(props) => props.disabled && "0.7"};
    font-size: 20.976px;
    cursor: ${(props) => props.disabled && "not-allowed"};
`;

const LinkTag = style(Link)`
    font-size: 13.976px;
    text-align: center;
    width: 100%;
    margin-top: 25px;
    display: flex;
    justify-content: center;
    text-decoration-line: underline;
    color: #52B6FF;
`

export {
    Container,
    Form,
    Input,
    Button,
    LinkTag
}
