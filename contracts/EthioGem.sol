// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EthioGem is ERC721URIStorage, Ownable{
    struct Gemstone {
        string name;
        string imageURI;
        string metadataURI;
    }

    Gemstone[] gemstones;

    constructor() ERC721("EthioGem", "ETG") {}

    function mint(string memory _name, string memory _imageURI, string memory _metadataURI) public onlyOwner {
        uint256 tokenId = gemstones.length;
        gemstones.push(Gemstone(_name, _imageURI, _metadataURI));
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _metadataURI);
    }

    function mintAll() public onlyOwner {
        string[4] memory gemstoneNames = ["Ethiopian Aquamarine", "Ethiopian Opal", "Ethiopian Ruby", "Ethiopian Sapphire"];
        string[4] memory gemstoneImageURIs = ["https://ipfs.filebase.io/ipfs/QmcyLbqNXTQdv6KLQF5CNSemPibdhbPp1QPqFvMBnjXXZE", "https://ipfs.filebase.io/ipfs/QmWkn6aT3R6mtVRJyY4r5m6Lz5Ftz2GLUtRcMSSQT4zhGb", "https://ipfs.filebase.io/ipfs/Qmf8DXSjuNoHYmvdnBk5eqQdPvfk2ujXDTLLiYCE2fosxs", "https://ipfs.filebase.io/ipfs/Qmc5fyShqE9GEV1H8L3Rm7q9knNMyHx4GHvtG7WVXWMTCh"];
        string[4] memory gemstoneMetadataURIs = ["https://ipfs.filebase.io/ipfs/QmWWvVXTvf1qnSfK36gN1ZjHR8PDr4ZSTzAsDykv58zPa1", "https://ipfs.filebase.io/ipfs/QmTJbk69cogaptSfdvjPJ3kvGD1sCwEKpxxmo2jYcEygWz", "https://ipfs.filebase.io/ipfs/QmZg6nx5QvWYZnTfacCiswC8D6CjvNMW7zbwGMkop2XYrf", "https://ipfs.filebase.io/ipfs/QmYEnPFaAGrfMDZvnbviuX3griRD4Q1DM43bNHvZcso1S6"];
        for (uint i = 0; i < 4; i++) {
            mint(gemstoneNames[i], gemstoneImageURIs[i], gemstoneMetadataURIs[i]);
        }
    }

}
