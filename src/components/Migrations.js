import web3 from "./web3";

const contractAddress = "0x8670d21e70b8909e514f59806c8593E5bE98b16D";

// Replace with your contract's ABI (copy from Remix after compilation)
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "completed",
				"type": "uint256"
			}
		],
		"name": "setCompleted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "last_completed_migration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, contractAddress);

export { contractAddress, abi, contract };