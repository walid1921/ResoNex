import styled from "styled-components"



const SpinnerContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`

const StyledSpinner = styled.div`
  border: 4px solid #3a6ef0a4;
  border-top: 4px solid #1b2f60; 
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
`


function Spinner() {

  return (
    <SpinnerContainer>
      <StyledSpinner></StyledSpinner>
    </SpinnerContainer>
  )
}

export default Spinner
