// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "./Counters.sol";

contract NeoHackathonNFT is ERC721, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    constructor() ERC721("NeoHackathonNFT", "NHN") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) public {
        _safeMint(to, _tokenIdTracker.current());
        _tokenIdTracker.increment();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
