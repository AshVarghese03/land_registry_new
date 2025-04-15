import React, { useState } from "react";
import Web3 from "web3";
import { contractAddress, abi } from "../config"; // Update this with your contract details

const RegistrationForm = () => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [landAddress, setLandAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Connect to Web3 and Contract
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setLoading(true);
    
    try {
      await contract.methods
        .Registration(
          accounts[0],
          ipfsHash,
          landAddress,
          web3.utils.toWei(amount, "ether"), // Convert to Wei if necessary
          key,
          status,
          availability
        )
        .send({ from: accounts[0] });
        
      alert("Registration Successful!");
    } catch (error) {
      alert("Error during registration!");
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h2>Land Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>IPFS Hash</label>
          <input 
            type="text" 
            value={ipfsHash} 
            onChange={(e) => setIpfsHash(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Land Address</label>
          <input 
            type="text" 
            value={landAddress} 
            onChange={(e) => setLandAddress(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Amount (in Ether)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Key</label>
          <input 
            type="text" 
            value={key} 
            onChange={(e) => setKey(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Status</label>
          <input 
            type="text" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Availability</label>
          <input 
            type="text" 
            value={availability} 
            onChange={(e) => setAvailability(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Land"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
