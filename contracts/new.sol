// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import '@openzeppelin/contracts/access/Ownable.sol';



contract MyNFTLiquidityPool is Ownable ,ERC20,IERC721Receiver
{
    struct Loan{
        uint256 loanId;
        address nftcontractaddress;
        uint256 maximumRepaymentAmount;
        uint64 loanStartTime;
        uint32 loanDuration;
        address borrower;
    }

    uint256 public totalNumLoans = 0;

    uint256 public totalActiveLoans = 0;

    mapping (uint256 => bool) public loanRepaidOrLiquidated;

    mapping(address => uint256) public checkpoints;
    mapping(address => uint256) public deposited_tokens;
    mapping(address => bool) public has_deposited;
    ERC721 public my_token;
    bytes data1;

    function onERC721Received(
        address operator, 
        address from, 
        uint256 tokenId, 
        bytes calldata data) external override returns (bytes4) {   
            require(operator!=from,'haha');
            data1 = data;
            deposit(tokenId);
        return IERC721Receiver.onERC721Received.selector;
    } 

    uint public REWARD_PER_BLOCK = 1 ether;

    constructor(address nftaddress) ERC20("test","test"){
        my_token = ERC721(nftaddress);
    }
    
    function setapprove(uint256 tokenId) public{
        my_token.approve(address(this), tokenId);
    }

    function deposit(uint256 tokenId) public
    {
        require (msg.sender == my_token.ownerOf(tokenId), 'Sender must be owner');
        require (!has_deposited[msg.sender], 'Sender already deposited');
        if(checkpoints[msg.sender] == 0){
            checkpoints[msg.sender] = block.number;
        }
        my_token.transferFrom(msg.sender, address(this), tokenId);
        deposited_tokens[msg.sender] = tokenId;
        has_deposited[msg.sender] = true;
        _mint(msg.sender,REWARD_PER_BLOCK);
   }

   function getowner(uint256 id) public view returns(address){
       return my_token.ownerOf(id);
   }

    function withdraw() external
    {
        require(has_deposited[msg.sender], 'No tokens to withdarw');
        my_token.transferFrom(address(this), msg.sender, deposited_tokens[msg.sender]);
        has_deposited[msg.sender] = false;
        transferFrom(msg.sender, address(this), REWARD_PER_BLOCK);
    }

    function calculateReward(address beneficiary) public view returns(uint256)
    {
        if(!has_deposited[msg.sender])
        {
            return 0;
        }
        uint256 checkpoint = checkpoints[beneficiary];
        return REWARD_PER_BLOCK * (block.number-checkpoint);
    }

}