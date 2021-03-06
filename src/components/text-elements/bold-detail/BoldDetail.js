import React from "react";
import styled from "styled-components";
import Typography from "../../../consts/typography/Typography";

const BoldDetail = ({ children, className }) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

const Wrapper = styled.span`
  ${Typography.boldDetail}
`;

export default BoldDetail;
