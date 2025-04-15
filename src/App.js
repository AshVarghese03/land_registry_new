import React, { useState, useEffect } from "react";
import Web3 from "web3"; // Import Web3
import { contractAddress, abi } from './config'; // Ensure ABI and contractAddress are correct

// Initialize Web3
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(abi, contractAddress);

function App() {
  const [account, setAccount] = useState(null);
  const [lands, setLands] = useState([]);
  const [landDetails, setLandDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("viewLands");

  // States for registering a new land
  const [ipfsHash, setIpfsHash] = useState("");
  const [landAddress, setLandAddress] = useState("");
  const [landAmount, setLandAmount] = useState("");
  const [landKey, setLandKey] = useState("");
  const [isGovtApproved, setIsGovtApproved] = useState("");
  const [isAvailable, setIsAvailable] = useState("");

  useEffect(() => {
    // Check if MetaMask is available
    if (window.ethereum) {
      window.ethereum.enable().then(accounts => {
        setAccount(accounts[0]);
        fetchLands();
      }).catch(error => {
        console.error("User denied account access:", error);
      });
    }
  }, []);

  // Fetch list of lands
  const fetchLands = async () => {
    setLoading(true);
    try {
      const allLands = await contract.methods.Assets().call();
      setLands(allLands);
    } catch (error) {
      console.error("Error fetching lands:", error);
    }
    setLoading(false);
  };

  // Fetch specific land info
  const fetchLandInfo = async (landId) => {
    try {
      const landInfo = await contract.methods.landInfoOwner(landId).call();
  
      if (landInfo && landInfo.lamount) {
        setLandDetails(landInfo);
      } else {
        console.error("Land info not found");
      }
    } catch (error) {
      console.error("Error fetching land details:", error);
    }
  };

  // Buy land
  const buyLand = async (landId) => {
    try {
      const landInfo = await contract.methods.landInfoOwner(landId).call();
      const value = web3.utils.toWei(landInfo.lamount.toString(), "ether");

      await contract.methods.buyProperty(landId).send({
        from: account,
        value: value,
      });
      alert("Land purchased successfully!");
      fetchLands(); // Refresh land list after purchase
    } catch (error) {
      console.error("Error buying land:", error);
    }
  };

  // Register a new land
  const registerLand = async (e) => {
    e.preventDefault();
    try {
      // Ensure the land key is generated before registration
      const computedKey = await contract.methods.computeId(landAddress, landAmount.toString()).call();

      await contract.methods.Registration(
        account,
        ipfsHash,
        landAddress,
        landAmount,
        computedKey,
        isGovtApproved,
        isAvailable
      ).send({ from: account });
      alert("Land registered successfully!");
      setActiveTab("viewLands"); // Switch back to "View Lands" after registration
      fetchLands(); // Refresh land list after registration
    } catch (error) {
      console.error("Error registering land:", error);
    }
  };

  return (
    <div>
      <h1>Land Registry</h1>
      {account ? (
        <div>
          <h2>Welcome, {account}</h2>
          <div>
            {/* Tab Navigation */}
            <button onClick={() => setActiveTab("viewLands")}>View Lands</button>
            <button onClick={() => setActiveTab("registerLand")}>Register Land</button>
          </div>

          {/* Display the active tab */}
          {activeTab === "viewLands" && (
            <div>
              <h3>Available Lands</h3>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  {lands.length > 0 ? (
                    lands.map((landId) => (
                      <div key={landId}>
                        <h3>Land ID: {landId}</h3>
                        <button onClick={() => fetchLandInfo(landId)}>
                          View Details
                        </button>
                        <button onClick={() => buyLand(landId)}>
                          Buy Land
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No lands available</p>
                  )}
                </div>
              )}

              {landDetails && (
                <div>
                  <h3>Land Details</h3>
                  <p><strong>IPFS Hash:</strong> {landDetails.ipfsHash}</p>
                  <p><strong>Land Address:</strong> {landDetails.laddress}</p>
                  <p><strong>Amount:</strong> {web3.utils.fromWei(landDetails.lamount.toString(), "ether")} ETH</p>
                  <p><strong>Status:</strong> {landDetails.isGovtApproved}</p>
                  <p><strong>Availability:</strong> {landDetails.isAvailable}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "registerLand" && (
            <div>
              <h3>Register Land</h3>
              <form onSubmit={registerLand}>
                <div>
                  <label>IPFS Hash:</label>
                  <input
                    type="text"
                    value={ipfsHash}
                    onChange={(e) => setIpfsHash(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Land Address:</label>
                  <input
                    type="text"
                    value={landAddress}
                    onChange={(e) => setLandAddress(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Amount (in ETH):</label>
                  <input
                    type="number"
                    value={landAmount}
                    onChange={(e) => setLandAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Government Approval Status:</label>
                  <input
                    type="text"
                    value={isGovtApproved}
                    onChange={(e) => setIsGovtApproved(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Availability:</label>
                  <input
                    type="text"
                    value={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Register Land</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>Please connect to MetaMask to continue.</p>
      )}
    </div>
  );
}

export default App;
