/* global chrome */
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import AddBtn from "./components/AddBtn";
import {ReactSVG} from "react-svg";
import MoneyPopup from "./components/MoneyPopup";
import ReactPlayer from 'react-player';

const MainWindowHolder = styled.div`
  overflow-y: auto;
  max-height: 380px;
`;

const Amount = styled.div`
  font-size: 14px;
  margin-right: 25px;
`;

const AssetsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const AssetsListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 18px;
  margin-bottom: 12px;
`;

const IconHolder = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const NFTList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const NFTItem = styled.li`
  width: 100%;
  margin-right: 12px;
  &:last-child {
    margin-right: 0 !important;
  }
`;

const WhiteList = styled(AssetsList)`
  
`;
const WhiteListItem = styled.li`
  display: flex;
  align-items: center;
  width: 75%;
  justify-content: space-between;
  > span {
    font-size: 14px;
  }
`;



export const assets = [
  {
    src: "./assets/01-eth.svg",
    id: 1,
    amount: 1.2523805,
    cur: 'ETH'
  },
  {
    src: "./assets/05-mana.svg",
    id: 1,
    amount: 71.23805,
    cur: 'MANA'
  },
  {
    src: "./assets/02-sol.svg",
    id: 1,
    amount: 21.134,
    cur: 'SOL'
  }
];

const mockNFTs = [
  {
    id: 8976,
    src: '../assets/nft/05.webm',
    name: 'MIDO-KAPPA',
  },
  {
    id: 1798,
    src: '../assets/nft/69158941.webm',
    name: 'KAGETENGU',
  },
  {
    id: 189,
    src: '../assets/nft/cc547b8b.webm',
    name: 'GRFK:GURREN'
  }
];

const mockGames = [
  {
    id: '42345f',
    title: 'Decentraland',
    whiteList: true,
  },
  {
    id: '42345fa',
    title: 'Axies',
    whiteList: false,
  },
  {
    id: '4s234a5f',
    title: 'Crypto Kities',
    whiteList: false,
  },
]

export const PopupComponent = () => {
  const [showCard, setShowCard] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  const topUp = (curName) => {
    setSelectedCrypto(curName);
    setShowCard(true);
  }

  return (
    <MainWindowHolder>
      <h3>Connected to %Best Crypto Game%</h3>
      <h4>Assets</h4>
      <AssetsList>
        {
          assets.map(el => <AssetsListItem>
            <IconHolder>
              <ReactSVG src={el.src}/>
            </IconHolder>
            <Amount>{el.amount} <strong>{el.cur}</strong></Amount>
            <div onClick={() => topUp(el.cur)}
                 style={{
                   display: "flex",
                   justifySelf: "flex-end",
                   alignItems: "center",
                   marginLeft: 'auto'
                 }}><AddBtn/></div>
          </AssetsListItem>)
        }
      </AssetsList>

      <h4>NFTs</h4>
      <NFTList>
        {
          mockNFTs.map(el => <NFTItem key={el.id}>
            <div style={{display: 'flex', flexFlow: 'column'}}>
              <ReactPlayer width={'110px'} height={'110px'} playing url={el.src} />
              <span>{el.name}</span>
            </div>
          </NFTItem>)
        }
      </NFTList>

      <h4>Whitelist</h4>
      <WhiteList>
        {
          mockGames.map((el, i) => <WhiteListItem key={el.id}>
            <span>{el.title}</span>

            <input className="tgl tgl-light" id={el.id}
                   type="checkbox"/>
            <label className="tgl-btn" htmlFor={el.id} />
          </WhiteListItem>)
        }
      </WhiteList>

      <MoneyPopup show={showCard}
                  cryptoAsset={selectedCrypto}
                  onClose={(newAmount) => {
                    setShowCard(false);
                    assets.map(el => {
                      if (el.cur === selectedCrypto) {
                        el.amount += newAmount;
                      }
                      return el;
                    })
                  }}/>
    </MainWindowHolder>
  );
};
