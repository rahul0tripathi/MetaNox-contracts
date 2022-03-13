//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "hardhat/console.sol";

contract NoxLands is ERC1155Upgradeable {
    uint256 public constant NOX = 0;
    uint256 public constant CANNON = 1;
    uint256 public constant CANNON_BUILD_TIME = 30;
    uint256 public constant CAMP = 2;
    uint256 public constant CAMP_BUILD_TIME = 60;
    uint256 public constant BUILDER_HUT = 3;
    uint256 public constant BUILDER_HUT_BUILD_TIME = 60;
    uint256 public constant BARRACK = 4;
    uint256 public constant BARRACK_BUILD_TIME = 60;
    uint256 public constant GEM_BOX = 5;
    uint256 public constant GEM_BOX_BUILD_TIME = 60;
    uint256 public constant TOWER = 6;
    uint256 public constant TOWER_BUILD_TIME = 60;
    uint256 public constant GOLD_BOX = 7;
    uint256 public constant GOLD_BOX_BUILD_TIME = 60;
    uint256[7] public Assets;
    uint256[7] public BuildTime;
    mapping(address => uint256) public BuilderStatus;
    mapping(address => mapping(uint256 => string[])) public AssetList;
    mapping(address => mapping(uint256 => bool)) public IsBuilding;

    function initialize() public initializer {
        __ERC1155_init("testFunction-{id}");
        _mint(msg.sender, NOX, 21000000 * 10**18, "");
        Assets = [CANNON, CAMP, BUILDER_HUT, BARRACK, GEM_BOX, TOWER, GOLD_BOX];
        BuildTime = [
            CANNON_BUILD_TIME,
            CAMP_BUILD_TIME,
            BUILDER_HUT_BUILD_TIME,
            BARRACK_BUILD_TIME,
            GEM_BOX_BUILD_TIME,
            TOWER_BUILD_TIME,
            GOLD_BOX_BUILD_TIME
        ];
        for (uint256 i = 0; i < Assets.length; i++) {
            _mint(msg.sender, Assets[i], 600, "");
        }
    }

    function flushBuilders(address owner) internal builderFree {
        for (uint256 i = 0; i < Assets.length; i++) {
            if (IsBuilding[owner][Assets[i]]) {
                IsBuilding[owner][Assets[i]] = false;
            }
        }
    }

    function resizeAssets(address owner, uint256 id) internal {
        for (uint256 i = 0; i < Assets.length; i++) {
            if (AssetList[owner][id].length > balanceOf(msg.sender, id)) {
                for (
                    uint256 j = 0;
                    j < balanceOf(msg.sender, id) - AssetList[owner][id].length;
                    j++
                ) {
                    AssetList[owner][id].pop();
                }
            }
        }
    }

    function buildNewAsset(
        uint256 asset,
        string memory x,
        string memory y
    ) public builderFree {
        require(asset <= Assets.length + 1, "invalid asset");
        resizeAssets(msg.sender, asset);
        flushBuilders(msg.sender);
        BuilderStatus[msg.sender] = block.timestamp + BuildTime[asset-1];
        AssetList[msg.sender][asset].push(string(abi.encodePacked(x, ":", y)));
        IsBuilding[msg.sender][asset] = true;
        console.log("started building till", BuilderStatus[msg.sender]);
    }

    function isBuilderFree() public view returns (bool) {
        console.log("current tstamp", block.timestamp);
        console.log("building till", BuilderStatus[msg.sender]);
        if (
            ((BuilderStatus[msg.sender] < block.timestamp) ||
                (BuilderStatus[msg.sender] == 0))
        ) {
            return true;
        } else {
            return false;
        }
    }

    function getCurrentlyBuildingAsset() public view returns (uint256) {
        for (uint256 i = 0; i < Assets.length; i++) {
            if (IsBuilding[msg.sender][i]) {
                return i;
            }
        }
        return 0;
    }

    function getAssets(uint256 asset) public view returns (string[] memory) {
        return AssetList[msg.sender][asset];
    }

    modifier builderFree() {
        console.log("current tstamp", block.timestamp);
        console.log("building till", BuilderStatus[msg.sender]);
        require(
            ((BuilderStatus[msg.sender] < block.timestamp) ||
                (BuilderStatus[msg.sender] == 0)),
            "Builder is not freee"
        );
        _;
    }
}
