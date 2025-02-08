import React from "react";
import styled from "styled-components";

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: absolute;
    inset: 0;
    background: #000;
  }

  .container::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMTkuNSIgbnVtT2N0YXZlcz0iMTAiIHJlc3VsdD0idHVyYnVsZW5jZSIvPjxmZUNvbXBvc2l0ZSBvcGVyYXRvcj0iaW4iIGluPSJ0dXJidWxlbmNlIiBpbjI9IlNvdXJjZUFscGhhIiByZXN1bHQ9ImNvbXBvc2l0ZSIvPjxmZUNvbG9yTWF0cml4IGluPSJjb21wb3NpdGUiIHR5cGU9Imx1bWluYW5jZVRvQWxwaGEiLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJjb21wb3NpdGUiIG1vZGU9ImNvbG9yLWJ1cm4iLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsdGVyPSJ1cmwoJyNhJykiPjxwYXRoIGZpbGw9IiMyNmIiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0wIDB2MTAwaDEwMFYwWiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiM0OGYiIGZpbGw9IiMwMDAwIi8+PHBhdGggZmlsbD0iIzQ4ZjUiIGQ9Ik01MCAwaDF2MTAwaC0xeiIvPjxwYXRoIGZpbGw9IiM0OGY1IiBkPSJNMCA1MGgxMDB2MUgweiIvPjwvZz48L3N2Zz4=");
    mask: linear-gradient(#0004, #000);
  }
`;

export default Pattern;
