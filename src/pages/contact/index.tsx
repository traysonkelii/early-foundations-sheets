import { Banner, BannerGradient } from "@/components/Banner";
import { HeaderText } from "@/components/HeaderText";
import { TextHolder } from "@/components/TextHolder";
import { useSheetsContext } from "@/context/SheetsContext";
import React, { useState } from "react";
import styled from "styled-components";

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
  const { contactContext, writeToForm } = useSheetsContext();

  const button = contactContext.button;
  const buttonUrl = button.link ?? "";

  const [formData, setFormData] = useState<FormDataType>({
    subject: "",
    message: "",
    email: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  console.log(contactContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      writeToForm({
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setFormData({
        subject: "",
        message: "",
        email: "",
      });

      setConfirmationMessage("Thank you for your feedback!");
    } catch (error) {
      setConfirmationMessage("Error with your submission, try again later");
      console.log("Error in from submission: " + error);
    }
  };

  return (
    <>
      <Banner
        backgroundUrl={contactContext.bannerUrl}
        gradient={BannerGradient.toLight}
      />
      <TextHolder>
        <HeaderText>{contactContext.title}</HeaderText>
        <h2>{contactContext.subHeaders[0]} </h2>
        <div>{contactContext.text}</div>
        <button style={{ marginTop: "2%" }}>
          <a
            target={"_blank"}
            href={buttonUrl}
            rel={"noopener noreferrer"}
            dangerouslySetInnerHTML={{ __html: button.displayValue }}
          />
        </button>
        <h2>For Prospective Employees</h2>
        <button style={{ marginTop: "2%" }}>
          <a
            target={"_blank"}
            href={"https://www.primroseschools.com/careers/search-jobs"}
            rel={"noopener noreferrer"}
            dangerouslySetInnerHTML={{
              __html: "Job Openings",
            }}
          />
        </button>
        {/* <h2>{contactContext.subHeaders[1]}</h2>
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
        <p>{confirmationMessage}</p> */}
      </TextHolder>
    </>
  );
};

export default ContactForm;
