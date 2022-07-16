import React from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useGlobal from '../../hooks/useGlobal';
import { FooterBox, FooterInnerBox, ProgressContainer, LinkTag } from './Styles';

const Footer = () =>
{
  const { todayProgressState } = useGlobal();

    return <FooterBox>
      <FooterInnerBox>
      <LinkTag to={`/habitos`}>
           Hábitos
      </LinkTag>
      <LinkTag to={`/historico`}>
           Histórico
      </LinkTag>
      <ProgressContainer>
      <LinkTag to={`/hoje`}>
        <CircularProgressbar
          value={todayProgressState}
          text={`Hoje`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: todayProgressState > 90 ? "#8FC549" : "#3e98c7",
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent",
            width: "100%",
            height: "100%"
          })}
        />
        </LinkTag>
      </ProgressContainer>
      </FooterInnerBox>
    </FooterBox>
    
}

export default Footer;