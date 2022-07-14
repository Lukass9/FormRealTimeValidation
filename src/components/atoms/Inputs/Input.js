import styled from 'styled-components';

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid black;
  box-sizing: border-box;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  border-radius: 25px;
  border-color: ${({isError})=> (isError? "black" : "red")} ;
  font-size: 12px;
  margin: 4px;

  &:focus {
    outline: none;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
`;
