import styled from 'styled-components';

const StyledButton = styled.button`
  /* width: 100px; */
  background-color: rgb(253, 224, 4);
  color: black;
  border: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: large;
  padding: 2px;
  padding-left: 8px;
  padding-right: 8px;
  cursor: pointer;
`;

function Button({ text, width, type }) {
  return (
    <>
      <StyledButton type={type} style={{ width: `${width}px` }}>
        {text}
      </StyledButton>
    </>
  );
}
export default Button;
