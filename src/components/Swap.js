import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

const style = {
    wrapper: `w-screen flex items-center justify-center mt-14`,
    content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
    formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
    transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-4 border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
    transferPropInput: `bg-transparent text-slate-400 placeholder:text-[#B2B9D2] outline-none w-full`,
    currencySelector: `flex`,
    currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
    currencySelectorIcon: `flex items-center`,
    currencySelectorTicker: `mx-2 text-slate-400`,
    currencySelectorArrow: `text-lg`,
    groupButton: `py-2 px-4 text-sm font-medium text-gray-900 bg-slate-400  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`,
    confirmButton: `bg-[#2172E5] text-slate-400 my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
  }
  

const Swap = ()=>{
    
    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(false);
    const [showC, setShowC] = useState(false);

    const [inputAmount1, setInputAmount1] = useState('');
    const [inputAmount2, setInputAmount2] = useState('');
    const [inputAmount3, setInputAmount3] = useState('');
    const [inputTokenIn2, setInputTokenIn2] = useState('');
    const [inputTokenIn3, setInputTokenIn3] = useState('');
    const [inputTokenOut1, setInputTokenOut1] = useState('');
    const [inputTokenOut3, setInputTokenOut3] = useState('');

    const [account, setAccount] = useState('');

    const Metamaskconnect=async()=>{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
         setAccount(accounts[0]);            
      }

    const Swap = async(condition)=>{
        let receipt = "";
        if(condition === 1){
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contractAddress = "0x751A3F987DD8b08FB85dfFF163ab9C6982CE1790";
                let abi = ["function SwapETHForToken(address token, address to) external payable"];
                let contract = new ethers.Contract(contractAddress, abi, signer);
                const options = {value: ethers.utils.parseEther(inputAmount1)};
                await contract.SwapETHForToken(inputTokenOut1,signer.getAddress(), options);
            } catch (error) {
                console.log(error);
            }
            
        } else if(condition === 2) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let abi1 = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
                let contract_1 = new ethers.Contract(inputTokenIn2, abi1, signer);
                let contractAddress = "0x751A3F987DD8b08FB85dfFF163ab9C6982CE1790";
                let tx = await contract_1.approve(contractAddress, inputAmount2);
                receipt = await tx.wait();
                let overrides = {
                    gasLimit: 750000,
                };
                let abi2 = ["function SwapTokenForETH(uint tokenAmount, address token, address to) external"];
                let contract = new ethers.Contract(contractAddress,abi2,signer);
                await contract.SwapTokenForETH(inputAmount2,inputTokenIn2,signer.getAddress(),overrides);
            } catch (error) {
                console.log(error);
            }
            
        }else{
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let abi = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
                let contract1 = new ethers.Contract(inputTokenIn3, abi, signer);
                let contractAddress = "0x751A3F987DD8b08FB85dfFF163ab9C6982CE1790";
                let tx = await contract1.approve(contractAddress, inputAmount3);
                receipt = await tx.wait();
                let overrides = {
                    gasLimit: 750000,
                };
                let abi2 = ["function SwapTokenForToken(address tokenIn,address tokenOut,uint amountIn,address to) external"];
                let contract = new ethers.Contract(contractAddress,abi2,signer);
                await contract.SwapTokenForToken(inputTokenIn3,inputTokenOut3, inputAmount3,signer.getAddress(),overrides);
            } catch (error) {
                console.log(error);
            }
        }
        return receipt;
    }
    
    return(
        <div className={style.wrapper}>
            <div className={style.content}>
                <div className={style.formHeader}>
                    <div>
                        <span className="text-slate-400"> Swap </span>
                    </div>
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button 
                            type="button" 
                            className={style.groupButton}
                            onClick={()=>{setShowA(true);setShowB(false);setShowC(false);}} >
                            ETH ={'>'} Token
                        </button>
                        <button 
                            type="button"
                            className={style.groupButton}
                            onClick={()=>{setShowA(false);setShowB(true);setShowC(false);}}>
                            Token ={'>'} ETH
                        </button>
                        <button 
                            type="button"
                            className={style.groupButton}
                            onClick={()=>{setShowA(false);setShowB(false);setShowC(true);}}>
                            Token ={'>'} Token
                        </button>
                    </div>
                </div>
                <div className={`${showA ? "" : "hidden"}`}> 
                    <div className={style.transferPropContainer}>
                        <input
                            type='text'
                            className={style.transferPropInput}
                            placeholder='0.0'
                            value={inputAmount1}
                            onInput={e => setInputAmount1(e.target.value)}
                        />
                        <div className={style.currencySelector}>
                            <div className={style.currencySelectorContent}>
                                <div className={style.currencySelectorTicker}>Amount</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.transferPropContainer}>
                        <input
                            type='text'
                            className={style.transferPropInput}
                            placeholder='0x...'
                            value={inputTokenOut1}
                            onInput={e => setInputTokenOut1(e.target.value)}
                        />
                        <div className={style.currencySelector}>
                            <div className={style.currencySelectorContent}>
                                <div className={style.currencySelectorTicker}>TokenOut</div>
                            </div>
                        </div>
                    </div>
                    {
                        window.ethereum? 
                            (account.length>0?
                                (<div onClick={()=>{Swap(1)}}  className={style.confirmButton}>
                                    Swap
                                </div>)
                                :
                               (<div onClick={()=>{Metamaskconnect()}}  className={style.confirmButton}>
                                    Connect Wallet
                                </div>)
                            
                            ):
                                (
                                <a className={style.confirmButton} target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                                    Install Metamask
                                </a>
                                )
                    }
                
                </div>
                <div className={`${showB ? "" : "hidden"}`}> 
                    <div className={style.transferPropContainer}>
                        <input
                            type='text'
                            className={style.transferPropInput}
                            placeholder='0.0'
                            value={inputAmount2}
                            onInput={e => setInputAmount2(e.target.value)}                            
                        />
                        <div className={style.currencySelector}>
                            <div className={style.currencySelectorContent}>
                                <div className={style.currencySelectorTicker}>Amount</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.transferPropContainer}>
                        <input
                            type='text'
                            className={style.transferPropInput}
                            placeholder='0x...'
                            value={inputTokenIn2}
                            onInput={e => setInputTokenIn2(e.target.value)}
                        />
                        <div className={style.currencySelector}>
                            <div className={style.currencySelectorContent}>
                                <div className={style.currencySelectorTicker}>TokenIn</div>
                            </div>
                        </div>
                    </div>
                    {
                        window.ethereum? 
                            (account.length>0?
                                (<div onClick={()=>{Swap(2)}}  className={style.confirmButton}>
                                    Swap
                                </div>)
                                :
                                (<div onClick={()=>{Metamaskconnect()}}  className={style.confirmButton}>
                                    Connect Wallet
                                </div>)
                            
                            ):
                                (
                                <a className={style.confirmButton} target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                                    Install Metamask
                                </a>
                                )
                    }
                </div>
                <div className={`${showC ? "" : "hidden"}`}>
                    <div className={style.transferPropContainer}>
                        <input
                            type='text'
                            className={style.transferPropInput}
                            placeholder='0.0'
                            value={inputAmount3}
                            onInput={e => setInputAmount3(e.target.value)}  
                            
                        />
                        <div className={style.currencySelector}>
                            <div className={style.currencySelectorContent}>
                                <div className={style.currencySelectorTicker}>Amount</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.transferPropContainer}>
                        <input
                            type='text'
                            className={style.transferPropInput}
                            placeholder='0x...'
                            value={inputTokenIn3}
                            onInput={e => setInputTokenIn3(e.target.value)}
                        />
                        <div className={style.currencySelector}>
                            <div className={style.currencySelectorContent}>
                                <div className={style.currencySelectorTicker}>TokenIn</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.transferPropContainer}>
                        <input
                            type='text'
                            className={style.transferPropInput}
                            placeholder='0x...'
                            value={inputTokenOut3}
                            onInput={e => setInputTokenOut3(e.target.value)}
                        />
                        <div className={style.currencySelector}>
                            <div className={style.currencySelectorContent}>
                                <div className={style.currencySelectorTicker}>TokenOut</div>
                            </div>
                        </div>
                    </div>
                    {
                        window.ethereum? 
                            (account.length>0?
                                (<div onClick={()=>{Swap(3)}}  className={style.confirmButton}>
                                    Swap
                                </div>)
                                :
                                (<div onClick={()=>{Metamaskconnect()}}  className={style.confirmButton}>
                                    Connect Wallet
                                </div>)
                            
                            ):
                                (
                                <a className={style.confirmButton} target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                                    Install Metamask
                                </a>
                               )
                    }
                </div>
            </div>

        
        </div>
    );
}

export default Swap;