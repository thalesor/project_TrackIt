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

const DoneInfo = style.h2`
    font-size: 17.976px;
    color: ${(props) => props.colored ?
    "#8FC549" : "#BABABA"};
    font-weight: 400;
`
const ContentBox = style.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 28px;
    width: 100%;
`;

const HabitoBox = style.div`
    width: inherit;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 14px;
    height: 94px;
    display: flex;
    justify-content: space-between;
`;

const HabitoGroup = style.div`
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 19.976px;
        color: #666666;
        font-weight: 400;
        margin-bottom: 8px;
    }
`;

const SpanGroup = style.div`
    display: flex;
    gap: 5px;
`;

const Span = style.span`
    font-size: 12.976px;
    color: ${(props) => props.colored ?
    "#8FC549" : "#666666"};
    font-weight: 400;
`;

const Beach = style.div`

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;

    img {
        width:100%;
        height: 300px;
    }
`;

const DoneButton = style.div`
    display: flex;
    justify-content: center;
    align-center: center;
    width: 69px;
    height: 69px;
    background-color: ${(props) => props.done ?
    "#8FC549" : "#CFCFCF"};
    border-radius: 5px;
    cursor: pointer;

    img {
        width: 35.09px;
        height: 28px;
        justify-self: center;
        align-self: center;
    }
`;

export {
    Container,
    HeaderBox,
    DoneInfo,
    ContentBox,
    HabitoBox,
    HabitoGroup,
    SpanGroup,
    Span,
    DoneButton,
    Beach
}