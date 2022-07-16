import React from 'react';
import door from '../../assets/door.png';
import useGlobal from '../../hooks/useGlobal';
import { HeaderBox, HeaderGroup, ExitButton } from './Styles';

const Header = () =>
{
  const { auth, logoff } = useGlobal();
    return <HeaderBox>
        <h1>TrackIt</h1>
        <HeaderGroup>
          <img src={auth.image}></img>
          <ExitButton src={door} onClick={()=> logoff()}></ExitButton>
        </HeaderGroup>
    </HeaderBox>
    
}

export default Header;