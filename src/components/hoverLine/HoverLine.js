import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';
import Colors from '../../consts/Colors';

const HoveredLine = ({
  hovered,
  zIndex,
  bottomOffset,
  width,
  placeholder,
  placeholderWidth = '0.5rem'
}) => {
  return (
    <Wrapper
      hovered={hovered}
      zIndex={zIndex}
      bottomOffset={bottomOffset}
      width={width}
      placeholder={placeholder}
      placeholderWidth={placeholderWidth}
    />
  );
};

const Wrapper = styled.div`
  z-index: ${(props) => (props.zIndex ? props.zIndex : 0)};
  position: absolute;
  bottom: calc(${(props) => (props.bottomOffset ? props.bottomOffset : '0px')} - 4px);
  left: 0;
  transition: width 0.3s;
  width: ${(props) =>
    props.hovered && props.width
      ? // if custom width is passed
        props.width
      : // if no custom width is passed
      props.hovered
      ? '120%'
      : // when not hovered
      props.placeholder
      ? props.placeholderWidth
      : '0px'};
  height: 4px;
  background-color: ${Colors.ehfmPrimary()};
`;

export default HoveredLine;
