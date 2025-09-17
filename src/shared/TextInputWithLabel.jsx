import styled from 'styled-components';

const StyledInput = styled.input`
  font-size: 1rem;
  padding: 0.25rem;
  margin: 0 1.25rem;
`;

function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      ></StyledInput>
    </>
  );
}

export default TextInputWithLabel;
