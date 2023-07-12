// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract HistoryVillage {

    uint internal historyLength;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    uint upvote;

    struct History {
        address payable owner;
        string author;
        uint date;
        string description;
        string source;
        string image;
        string secimg;
        uint readAmount;
        uint votes;

    }
    mapping (uint => History) history;
    

    
    function upVoteHistory(uint _upvotes) public {
        history[_upvotes].votes++;
        upvote ++;
    }

    // to upvote history
    function downVoteHistory(uint _upvotes) public {
        history[_upvotes].votes--;
        upvote --;
    }
     

     function addHistory(string memory _author,
         string memory _description,
        string memory _source, string memory _image, string memory _secimg, uint _readAmout) public {
            history[historyLength] = History(
                payable (msg.sender),
                _author,
                block.timestamp,
                _description,
                _source,
                _image,
                _secimg,
                _readAmout,
                0
            );
            historyLength++;
     }

     function getHistory(uint _index) public view returns(History memory) {
         return history[_index];
     }

     function getHistoryPay( uint _index) public payable {
       require(
           IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            history[_index].owner,
            history[_index].readAmount
           ),
           "Transfer Failed"
       );
     }

     function getHistoryLenght() public view returns (uint) {
        return (historyLength);
     }
}