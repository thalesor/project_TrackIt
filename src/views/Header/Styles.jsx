import style from 'styled-components';

const HeaderBox = style.header`
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0px;
    top: 0px;
    padding-inline: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 999;
    
  h1 {
    font-family: 'Playball', cursive;
    font-size: 38.982px;
    color: #FFFFFF;
  }
`;

const HeaderGroup = style.div`
    display: flex;
    gap: 20px;
    align-items: center;
    width: 100px;
    height:51px;
    
    img
    {
      width: 51px;
      height: 51px;
      border-radius: 98.5px;
    }
`;

const ExitButton = style.img`
    cursor: pointer;
    border-radius: 0px !important;
`

export {
    HeaderBox,
    HeaderGroup,
    ExitButton
}