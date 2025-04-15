import web3 from "./web3";

// Replace with your deployed contract address
const contractAddress = "0x8ca877dCEb357C41d9F56c18De7BF8578D1FA915";


// Replace with your contract's ABI (copy from Remix after compilation)
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Assets",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_laddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_lamount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_key",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_isAvailable",
				"type": "string"
			}
		],
		"name": "Registration",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "uid",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_uname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_ucontact",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_uemail",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_ucode",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ucity",
				"type": "string"
			}
		],
		"name": "addUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "property",
				"type": "uint256"
			}
		],
		"name": "buyProperty",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_laddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lamount",
				"type": "string"
			}
		],
		"name": "computeId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "findId",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "uid",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_isAvailable",
				"type": "string"
			}
		],
		"name": "govtStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "land",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "laddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lamount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "key",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "isGovtApproved",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "isAvailable",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"internalType": "enum LandRegistry.reqStatus",
				"name": "requestStatus",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "landInfoOwner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "enum LandRegistry.reqStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "property",
				"type": "uint256"
			}
		],
		"name": "makeAvailable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "property",
				"type": "uint256"
			},
			{
				"internalType": "enum LandRegistry.reqStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "processRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "requstToLandOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "address",
				"name": "userid",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ucontact",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uemail",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "upostalCode",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exist",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewAssets",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contract = new web3.eth.Contract(abi, contractAddress);

export { contractAddress, abi, contract };
