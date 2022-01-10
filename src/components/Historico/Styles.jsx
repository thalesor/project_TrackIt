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

const HeaderBox = style.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    h1 {
        color: #126BA5;
        font-size: 22.976px;
        font-weight: 400;
    }
`;

const ContentBox = style.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 28px;
    width: 100%;
    height: 100%;

    .calendar
    {
        background-color: #FFFFFF;
        border: 0;
        border-radius: 10px;
    }

    .jesus {
        background-color: red;
    }
`;

const DayLabel = style.div`
    width: 35px;
    height 35px;
    border: 0;

    span {
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 98px;
    }

    .danger {
        background-color: #ea5766
    }

    .success {
        background-color: #8bc654
    }
`;


export {
    Container,
    HeaderBox,
    ContentBox,
    DayLabel
}