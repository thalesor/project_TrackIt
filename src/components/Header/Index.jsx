import React, { useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import door from '../../assets/door.png';

import { HeaderBox, HeaderGroup, ExitButton } from './Styles';

const Header = () =>
{
  const { userData, logout } = useContext(UserContext);

    return <HeaderBox>
        <h1>TrackIt</h1>
        <HeaderGroup>
          <img src={userData.image}></img>
          <ExitButton src={door} onClick={()=> logout()}></ExitButton>
        </HeaderGroup>
    </HeaderBox>
    
}

export default Header;