import style from 'styled-components';


const Container = style.div`
    background-color: #E5E5E5;
    display: flex;
    padding-top: 100px;
    padding-bottom: 100px;
    padding-inline: 17px;
    height: 100vh;
    flex-direction: column;
    overflow-y: auto;
`;

const FlexBox = style.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height 35px;

    h1 {
        color: #126BA5;
        font-size: 22.976px;
        font-weight: 400;
    }

    button {
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        color: #FFFFFF;
        border: 0;
        outline: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        &:hover
        {
            filter: brightness(1.1);
        }
    }
`;

const Form = style.form`

    margin-top: 20px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
    display: flex;
    flex-direction: column;
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

const ButtonGroup = style.div`
    display: flex;
    gap: 5px;
    margin-top: 10px;
`;

const DayButton = style.button `
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.active ?
    "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    outline: 0;
    font-size: 19.976px;
    color: ${(props) => props.active  ?
    "#FFFFFF" : "#DBDBDB"};
`;

const SubmitGroup = style.div`
    margin-top: 28px;
    margin-left: auto;
    display: flex;
    gap: 10px;

    button
    {
        width: 84px;
        height: 35px;
        border-radius: 4.63636px;
        outline: 0;
        border: 0;
        font-size: 16px;
        text-align: center;
        cursor: ${(props) => props.disabled && "not-allowed"};
    }

    .submit
    {
        background: #52B6FF;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: ${(props) => props.disabled && "0.7"};
        color: #FFFFFF;
        &:hover
        {
            filter: brightness(1.1);
        }
    }

    .cancel
    {
        background-color: ${(props) => props.disabled ?
        "#BCBCBC" : "#FFFFFF"};
        color: #52B6FF;
        &:hover
        {
            filter: brightness(0.8);
        }
    }
`;

const HabitosGroup = style.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const HabitoBox = style.div`
    position: relative;
    width: inherit;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 13px 0px 15px 14px;
    display: flex;
    flex-direction: column;

    span
    {
        font-size: 19.976px;
        color: #666666;
    }
`;

const TrashButton = style.img`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 14px;
    height: 16px;
`;

const Message = style.h2`

    font-size: 17.98px;
    line-height: 22px;
    font-weight: 400;
    color: #666666;
    tet-align: justify;
    display: block;
    width:100%;
    margin-top: 28px;
`;

export {
    Container,
    FlexBox,
    Form,
    Input,
    ButtonGroup,
    DayButton,
    SubmitGroup,
    HabitosGroup,
    HabitoBox,
    TrashButton,
    Message
}