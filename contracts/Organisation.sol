// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
import "./Student.sol";
import "./Certification.sol";

contract Organisation {
    string public organisationName;
    address public organisationAddress;

    uint256[] public studentIDs;

    mapping(uint256 => address) public suidToAddress;

    uint256[] public arr = [1, 2, 3, 4];

    Student[] public students;

    function addStudent(
        string memory _name,
        uint256 _uid,
        address _addr,
        address _orgAddress
    ) public {
        Student s = new Student();
        s.setStudentName(_name);
        s.setStudentAccAddress(_addr);
        s.setStudentUniqueId(_uid);
        s.setOrganisationName(organisationName);
        s.setOrganisationAddress(_orgAddress);

        students.push(s);
    }

    function noOfStudents() public view returns (uint256) {
        return students.length;
    }

    function noOfUniqueIds() public view returns (uint256) {
        return studentIDs.length;
    }

    function addOrganisation(
        string memory _organisationName,
        address _organisationAddress
    ) public {
        organisationName = _organisationName;
        organisationAddress = _organisationAddress;
    }

    function findId(uint256 _id) public returns (uint256) {
        for (uint256 i = 0; i < studentIDs.length; i++) {
            if (studentIDs[i] == _id) {
                return studentIDs[i];
            }
        }
        return 0;
    }

    function addStudentId(uint256 _studentID) public {
        require(_studentID != findId(_studentID), "ID already exists");
        studentIDs.push(_studentID);
    }

    function checkStudentId(uint256 _studentID) public view returns (bool) {
        for (uint256 i = 0; i < studentIDs.length; i++) {
            if (studentIDs[i] == _studentID) {
                return true;
            }
        }
        return false;
    }
}
