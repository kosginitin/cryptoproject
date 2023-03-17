// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import "./Certification.sol";

contract Student {
    string public student_name;
    string public organisation_name;
    address public student_acc_address;
    uint256 public student_unique_id;
    address public organisation_address;

    Certification[] public certifications;

    uint256[] public certificateUniqueIds;

    function noOfCertificates() public view returns (uint256) {
        return certifications.length;
    }

    function setOrganisationAddress(address _orgAddress) public {
        organisation_address = _orgAddress;
    }

    function addCertificate(
        string memory _ipfs,
        string memory _merklee,
        uint256 cUnique,
        address sUnique,
        address _orgAdd
    ) public {
        Certification c = new Certification();
        c.setCertificationIpfsHashvalue(_ipfs);
        c.setMerkleeHashvalue(_merklee);
        c.setUniqueId(cUnique);
        c.setIssuedTo(sUnique);
        c.setDate();
        c.setStudentName(student_name);
        c.setIssuedBy(_orgAdd);

        certifications.push(c);
    }

    function setOrganisationName(string memory _name) public {
        organisation_name = _name;
    }

    function setStudentName(string memory name) public {
        student_name = name;
    }

    function setStudentAccAddress(address _add) public {
        student_acc_address = _add;
    }

    function setStudentUniqueId(uint256 _id) public {
        student_unique_id = _id;
    }

    function getCertificate(uint256 _id) public view returns (Certification) {
        for (uint256 i = 0; i < certifications.length; i++) {
            if (certifications[i].certification_unique_id() == _id) {
                return certifications[i];
            }
        }
    }

    function hasAcess(address _addr, uint256 _id)
        public
        view
        returns (string memory)
    {
        Certification c = getCertificate(_id);
        return c.checkAddressAcess(_addr);
    }

    function requestAcess(address _addr, uint256 _id) public {
        Certification c = getCertificate(_id);
        c.requestAcess(_addr);
    }

    function requests(uint256 _id) public view returns (address[] memory) {
        Certification c = getCertificate(_id);
        return c.requests();
    }

    function giveAcess(address add, uint256 _id) public {
        Certification c = getCertificate(_id);
        c.giveAcess(add);
    }

    // function getCertificateIds() public view returns (uint256[]) {
    //     uint256[] ids = new uint256[certifications.length];
    //     for (uint256 i = 0; i < certifications.length; i++) {
    //         ids[i] = certifications[i].certification_unique_id();
    //     }
    //     return ids;
    // }
}
