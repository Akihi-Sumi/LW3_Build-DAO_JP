// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract FakeNFTMarketplace {
    /// @dev Fake TokenIDとOwnerアドレスのマッピングを保持する。
    mapping(uint256 => address) public tokens;
    /// @dev 各Fake NFTの買取価格を設定する
    uint256 nftPrice = 0.1 ether;

    /// @dev urchase() ETHを受け取り、与えられたtokenIdの所有者を呼び出し元のアドレスとしてマークします。
    /// @param _tokenId - 購入する偽のNFTトークンIDです。
    function purchase(uint256 _tokenId) external payable {
        require(msg.value == nftPrice, "This NFT costs 0.1 ether");
        tokens[_tokenId] = msg.sender;
    }

    /// @dev getPrice() NFT1枚の価格を返します。
    function getPrice() external view returns (uint256) {
        return nftPrice;
    }

    /// @dev available() 与えられたtokenIdがすでに販売されているかどうかをチェックします。
    /// @param _tokenId - チェックするトークンID
    function available(uint256 _tokenId) external view returns (bool) {
        // address(0) = 0x0000000000000000000000000000000000000000
        // これは、Solidity のアドレスのデフォルト値です。
        if (tokens[_tokenId] == address(0)) {
            return true;
        }
        return false;
    }
}