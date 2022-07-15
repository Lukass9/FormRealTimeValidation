import React from 'react';
import { useForm } from 'react-hook-form';
import FormField from 'components/molecules/FormField/FormField';
import { Button } from 'components/atoms/Buttons/Button';
import { Form, Row, Wrapp } from 'App.style';
import styled from 'styled-components';
import { useEmailValid } from 'hooks/useEmailValid';

const Error = styled.p` 
  color: red;
  margin: 3px;
`
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({mode: "onChange"});
  const onSubmit = ({name, surname, email, birthDate,  gender}) => isValid ? window.alert(name + " " + surname + " " + birthDate + " " + email + " " + gender ) : null;

  const {isValid, handleEmailChange, handleCleareTimeout} = useEmailValid();
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      <Wrapp>
        <Row>
          <FormField label="Name" name="name" id="name" {...register('name', { required: true, minLength: 4})} />
          <FormField label="Surname" name="surname" id="surname" {...register('surname')} />
        </Row>
        {errors.name?.type === "required"?
          <Error> Name is required </Error> : null}
        {errors.name?.type === "minLength"?
          <Error> Name must be more than 3 characters </Error> : null}
        <Row>
          <FormField  label="Birth date" name="birthDate" id="birthDate" type="date" {...register('birthDate', { required: true })} />
          <FormField  label="Email" name="email" id="email" type="email" {...register('email', { required: true, onChange: (e) => {
            handleCleareTimeout();
            handleEmailChange(e)
            }  })}/>
          {/* <FormField  label="Email" name="email" id="email" type="email" {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i })}/> */}

        </Row>
          {!isValid?
          <Error> Email is not valid </Error> : null}
          {/* {errors.email?.type === "pattern"?
          <Error> Entered email is in wrong format </Error> : null} */}
          {errors.birthDate?.type === "required"?
          <Error> Birth date is required </Error> : null}
        <Row style = {{width: "30%"}}>
          <FormField label="Male" name="gender" id="gender" type="radio" value= "Male" {...register('gender')} />
          <FormField label="Female" name="gender" id="gender" type="radio" value= "Female" {...register('gender')} />
        </Row>
        <Button type="submit">Submit</Button>
      </Wrapp>
    </Form>
  );
}



export default App;
