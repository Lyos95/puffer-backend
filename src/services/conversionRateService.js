const { Web3 } = require('web3');
const BigNumber = require('bignumber.js');

require('dotenv').config();

const web3 = new Web3(process.env.INFURA_URL);
const contractAddress = '0xD9A442856C234a39a81a089C06451EBAa4306a72';
const { PufferVaultV2ABI } = require('../constants/contractABI');
const contract = new web3.eth.Contract(PufferVaultV2ABI, contractAddress);
const ConversionRate = require('../models/conversionRateModel');

// Function to fetch and calculate conversion rate
const fetchConversionRate = async () => {
    try {
        const totalAssets = await contract.methods.totalAssets().call();
        const totalSupply = await contract.methods.totalSupply().call();

        const bigIntTotalAssets =  new BigNumber(totalAssets);
        const bigIntTotalSupply =  new BigNumber(totalSupply);
        const conversionRate = bigIntTotalAssets.dividedBy(bigIntTotalSupply).toNumber();
        
        const newRate = new ConversionRate({
            conversionRate,
            supply: bigIntTotalSupply.toFixed(),
            assets: bigIntTotalAssets.toFixed(),
        });

        await newRate.save();
    } catch (error) {
        console.error('Error fetching conversion rate:', error);
    }
};

module.exports = { fetchConversionRate };