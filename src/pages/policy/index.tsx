import { useSheetsContext } from "@/context/SheetsContext";
import styled from "styled-components";

const Policy = () => {
  const { privacyLink } = useSheetsContext();

  return (
    <Holder>
      <h1>Privacy Policy</h1>
      <p>{privacyLink}</p>
    </Holder>
  );
};

export default Policy;

const Holder = styled.div`
  margin-right: 20%;
  margin-left: 20%;
  margin-bottom: 10%;
  margin-top: 5%;
  line-height: 2;
  font-size: large;
  text-align: center;
`;
