// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Certification {
    string public certification_ipfs_hashValue;
    string public certification_merklee_hashvalue;
    address[] public certification_acesss_by;
    uint256 public certification_unique_id;
    address public issued_to;
    string public studentName;
    uint256 public date;
    address public issuedBy;
    address[] public requested_by;

    function setDate() public {
        date = block.timestamp;
    }

    function accessLength() public view returns (uint256) {
        return certification_acesss_by.length;
    }

    function setIssuedBy(address _oAdd) public {
        issuedBy = _oAdd;
    }

    function setIssuedTo(address _iT) public {
        issued_to = _iT;
    }

    function setStudentName(string memory name) public {
        studentName = name;
    }

    function setCertificationIpfsHashvalue(string memory hashValue) public {
        certification_ipfs_hashValue = hashValue;
    }

    function setMerkleeHashvalue(string memory merkleeHashavlue) public {
        certification_merklee_hashvalue = merkleeHashavlue;
    }

    function addCertificationAddress(address _addAddress) public {
        certification_acesss_by.push(_addAddress);
    }

    function setUniqueId(uint256 _id) public {
        certification_unique_id = _id;
    }

    function checkAddressAcess(address _addr)
        public
        view
        returns (string memory)
    {
        for (uint256 i = 0; i < certification_acesss_by.length; i++) {
            if (certification_acesss_by[i] == _addr) {
                return "PRESENT";
            }
        }
        for (uint256 i = 0; i < requested_by.length; i++) {
            if (requested_by[i] == _addr) {
                return "REQUESTED";
            }
        }
        return "NOT_PRESNT";
    }

    function requestAcess(address _addr) public {
        requested_by.push(_addr);
    }

    function requests() public view returns (address[] memory) {
        return requested_by;
    }

    function remove(uint256 index) public {
        for (uint256 i = index; i < requested_by.length - 1; i++) {
            requested_by[i] = requested_by[i + 1];
        }
        requested_by.pop();
    }

    function giveAcess(address add) public {
        certification_acesss_by.push(add);
        for (uint256 i = 0; i < requested_by.length; i++) {
            if (requested_by[i] == add) {
                remove(i);
            }
        }
    }
}
