import style from 'styled-components';
import { Link } from 'react-router-dom';

 const FooterBox = style.footer`
    position: fixed;
    width: 100vw;
    height: 70px;
    left: 0px;
    bottom: 0px;
`;

 const FooterInnerBox = style.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding-inline: 34.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    a:-webkit-any-link {
      text-decoration: none;
  }

`;

const ProgressContainer = style.div`
position: absolute;
width: 91px;
height: 91px;
left: 39%;
bottom: 10px;
cursor: pointer;
`;

const LinkTag = style(Link)`
font-size: 17.976px;
color: #52B6FF;
`;

export {
    FooterBox,
    FooterInnerBox,
    ProgressContainer,
    LinkTag
}