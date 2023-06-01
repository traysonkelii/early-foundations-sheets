import React, { useState } from 'react';
import styled from 'styled-components';

type FormDataType = {
  subject: string;
  message: string;
  email: string;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const StyledButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #667517;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
`;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    subject: '',
    message: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subject: ${formData.subject}, Message: ${formData.message}, Email: ${formData.email}`);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>
        Subject:
        <StyledInput
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />
      </StyledLabel>
      <StyledLabel>
        Message:
        <StyledInput
          type="text"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
        />
      </StyledLabel>
      <StyledLabel>
        Email:
        <StyledInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </StyledLabel>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
};

export default ContactForm;
