import React, { useState } from "react";
import styled from "styled-components/macro";
import Colors from "../../../consts/Colors";
import { ReactSVG } from "react-svg";
import PayPalIcon from "../../../assets/svgs/chat.svg";
import { Cta } from "../../text-elements/index";
import Devices from "../../../consts/Devices";
import Sizes from "../../../consts/Sizes";

const PaypalButton = ({}) => {
  let [hovered, setHovered] = useState(false);
  //
  return (
    <Wrapper
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseOut={() => {
        setHovered(false);
      }}
      onClick={() =>
        window.open(
          "http://localhost:3000/chat",
          "EHFM - Chat",
          "resizable,height=560,width=420"
        )
      }
    >
      <InnerWrapper hovered={hovered}>
        <Text hovered={hovered}>Chat</Text>
        <IconWrapper hovered={hovered}>
          <ReactSVG src={PayPalIcon} />
        </IconWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const InnerWrapper = styled.div`
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${Sizes.buttonRadius}px;
  background-color: ${(props) =>
    props.hovered ? Colors.ehfmPrimary(0.1) : Colors.ehfmPrimary()};
  transition: background-color, 0.2s ease-out;
`;

const Text = styled(Cta)`
  font-weight: normal;
  margin-right: 0.5rem;
  color: ${(props) =>
    props.hovered ? Colors.ehfmPrimary() : Colors.playerWhite};
  transition: color, 0.2s ease-out;
`;

const IconWrapper = styled.div`
  div {
    display: flex;

    svg {
      height: auto;
      width: 20px;
      g {
        fill: ${(props) =>
          props.hovered ? Colors.ehfmPrimary() : Colors.playerWhite};
      }
    }
  }
`;

export default PaypalButton;
