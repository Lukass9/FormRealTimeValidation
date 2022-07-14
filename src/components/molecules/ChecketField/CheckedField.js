import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${Label} {
    margin: 10px 0;
  }
`;
const CheckedField = React.forwardRef(({ onChange, value, label, name, id, type = 'text', isTextarea, ...props }, ref) => {
    return (
      <Wrapper>
        <Label htmlFor={id}>{label}</Label>
        <Input name={name} id={id} type={type} value={value} onChange={onChange} data-testid={label} {...props} ref={ref} />
      </Wrapper>
    );
  });
  
  FormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
  };
  
  export default FormField;