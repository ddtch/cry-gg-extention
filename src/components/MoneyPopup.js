import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {ReactSVG} from "react-svg";

const MainWrapper = styled.div`

`;

const CardWrapper = styled.div`
  display: ${(props) => props.show ? 'block' : 'none'};
  position: absolute;
  top: ${(props) => props.show ? "68px" : '340px'};
  left: 2%;
  z-index: 6;
  width: 96%;
  height: 100%;
`;

const MainLineHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubmitBtn = styled.div`
  width: 120px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  background: linear-gradient(128deg, rgb(247, 216, 112) 0%, rgb(155, 97, 62) 100%);
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  margin: 10px auto;
  z-index: 10;
  position: relative;
`;

const SuccessPopup = styled.div`
  display: ${(props) => props.paymentOK ? 'flex' : 'none'};
  position: absolute;
  width: 64%;
  height: 240px;
  top: 40px;
  left: 18%;
  text-align: center;
  box-shadow: 0 0 12px 120px rgb(0 0 0 / 80%);
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background: #1a1b41;
  border-radius: 6px;
`;

export default function MoneyPopup({show, onClose, cryptoAsset, closeSuccess}) {
  const [amount, setAmount] = useState(1);
  const [crypto, setCrypto] = useState(amount * 1.18);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    onClose(crypto);
    setTimeout(() => {
      setSuccess(true);
    }, 300);

  }

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    setCrypto(val * 1.18);
  }

  useEffect(() => {
    console.log(show)
  }, [show])


  return (
    <MainWrapper>

      <CardWrapper show={show}>
        <div id={"form-container"}>

          <div id="card-front">
            <div id="image-container">
              <div id="amount">
                Pay: $<input style={{outline: 'none !important', width: '25%'}}
                             onChange={handleAmountChange}
                             value={amount}/>
                <span style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifySelf: 'flex-end',
                }}>Get: <strong>{crypto} {cryptoAsset}</strong></span>
              </div>
            </div>


            <MainLineHolder>
              <div id="number-container">
                <label for="card-number">
                  Card Number
                </label>
                <input type="text" id="card-number" placeholder="1234 5678 9101 1112" length="16"/>
              </div>

              <div id="cvc-container">
                <label htmlFor="card-cvc"> CVC/CVV</label>
                <input id="card-cvc" placeholder="XXX-X" type="text" min-length="3" max-length="4"/>
              </div>
            </MainLineHolder>

            <div id="cardholder-container">
              <label for="card-holder">Card Holder
              </label>
              <input type="text" id="card-holder" placeholder="e.g. John Doe"/>
            </div>

            <div id="exp-container">
              <label for="card-exp">
                Expiration
              </label>
              <input id="card-month" type="text" placeholder="MM" length="2"/>
              <input id="card-year" type="text" placeholder="YY" length="2"/>
            </div>

          </div>

        </div>

        <SubmitBtn onClick={() => handlePayment()}>TOP UP</SubmitBtn>
      </CardWrapper>

      <SuccessPopup paymentOK={success}>
        <h2>Payment successful!</h2>
        <div style={{width: 32, height: 32, margin: '10px 0'}}>
          <ReactSVG src={"../assets/check.svg"}/>
        </div>
        <SubmitBtn onClick={() => setSuccess(false)}>OK</SubmitBtn>
      </SuccessPopup>

    </MainWrapper>
  )
}
