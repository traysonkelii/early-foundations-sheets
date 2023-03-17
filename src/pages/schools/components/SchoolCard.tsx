import styled from "styled-components";

export interface SchoolCardData {
  title: string;
  url: string;
  address: string;
  cityState: string;
  image: string;
  lat?: number;
  long?: number;
  stateSymbol?: string;
}

export const SchoolCard = ({
  title,
  url,
  address,
  cityState,
  image,
}: SchoolCardData) => {
  return (
    <CardContainer>
      <a target={"_blank"} href={url} rel={"noopener noreferrer"}>
        <CardItem>
          <CardContent>
            <h3 style={{ marginBottom: 0 }}>{title}</h3>
            <hr style={{ marginBottom: "10%" }} />
            <img src={image} alt=""></img>
            <p style={{ textAlign: "center" }}>
              {address}
              <br />
              {cityState}
            </p>
          </CardContent>
        </CardItem>
      </a>
    </CardContainer>
  );
};

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
  color: #203864;
`;

export const CardItem = styled.div`
  padding: 10px 20px;
  text-align: center;
  height: 270px;
  width: 200px;
  color: #203864;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;

export const CardContent = styled.div`
  font-size: 0.75rem;
`;
