import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Label } from 'components/atoms/Label/Label';
import { Input } from 'components/atoms/Inputs/Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormField = React.forwardRef(({ isError, onChange, value, label, name, id, type = 'text', ...props }, ref) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input name={name} 
      id={id} type={type} 
      value={value} 
      onChange={onChange} 
      data-testid={label} 
      isError
      {...props} ref={ref} />
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
