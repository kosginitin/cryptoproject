// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
import "./Organisation.sol";
import "./Student.sol";
import "./Company.sol";
import "./HelperOrg.sol";

contract OverAll {
    struct certificate {
        string name;
        uint256 uniqueId;
        address issuedTo;
        uint256 date;
        address issuedBy;
        string ipfs;
    }
    HelperOrg public helper = new HelperOrg();
    Organisation[] public Orgaganisations;

    // Company[] public Companies;

    mapping(address => address) public stToOrg;

    struct organisation {
        string name;
        address addr;
        uint256 noOfStudents;
        uint256 noOfCertificates;
    }
    struct student {
        string name;
        address addr;
        uint256 studentUniqueId;
        uint256 noOfCertificates;
    }

    // addd organisation
    function addOrganisation(string memory name) public {
        Organisation org = new Organisation();
        org.addOrganisation(name, msg.sender);
        Orgaganisations.push(org);
    }

    function checkOrganisation() public view returns (string memory) {
        return helper.checkOrganisation(Orgaganisations, msg.sender);
    }

    function getOrganisation() public view returns (Organisation) {
        return helper.getOrganisation(Orgaganisations, msg.sender);
    }

    // all orgaisations
    function getAllOrganisations() public view returns (organisation[] memory) {
        organisation[] memory orgs = new organisation[](Orgaganisations.length);
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            orgs[i].name = Orgaganisations[i].organisationName();
            orgs[i].addr = Orgaganisations[i].organisationAddress();
            orgs[i].noOfStudents = Orgaganisations[i].noOfStudents();
            orgs[i].noOfCertificates = helper.totalCertificates(
                Orgaganisations[i]
            );
        }
        return orgs;
        // return Orgaganisations;
    }

    // get organisation details
    function getOrganisationDetails()
        public
        view
        returns (
            string memory,
            address,
            uint256,
            uint256,
            uint256
        )
    {
        return helper.getOrganisationDetails(Orgaganisations, msg.sender);
    }

    // get allstudents
    function getAllStudents() public view returns (student[] memory) {
        Organisation org = getOrganisation();
        student[] memory allStudents = new student[](org.noOfStudents());
        for (uint256 i = 0; i < org.noOfStudents(); i++) {
            student memory s = student(
                org.students(i).student_name(),
                org.students(i).student_acc_address(),
                org.students(i).student_unique_id(),
                org.students(i).noOfCertificates()
            );
            allStudents[i] = s;
        }
        return allStudents;
    }

    // add student
    function addStudent(
        string memory _name,
        uint256 _uid,
        address _orgAddr
    ) public {
        Organisation org = helper.getOrganisation(Orgaganisations, msg.sender);
        org.addStudent(_name, _uid, msg.sender, _orgAddr);

        stToOrg[msg.sender] = _orgAddr;
    }

    // get all certificates of a student
    function getAllCertificates() public view returns (certificate[] memory) {
        Organisation org = getOrganisation();
        certificate[] memory allCertificates = new certificate[](
            helper.totalCertificates(org)
        );
        uint256 k = 0;
        for (uint256 i = 0; i < org.noOfStudents(); i++) {
            for (uint256 j = 0; j < org.students(i).noOfCertificates(); j++) {
                certificate memory c = certificate(
                    org.students(i).certifications(j).studentName(),
                    org.students(i).certifications(j).certification_unique_id(),
                    org.students(i).certifications(j).issued_to(),
                    org.students(i).certifications(j).date(),
                    org.students(i).certifications(j).issuedBy(),
                    org
                        .students(i)
                        .certifications(j)
                        .certification_ipfs_hashValue()
                );
                allCertificates[k] = c;
                k++;
            }
        }
        return allCertificates;
    }

    // checkstudent
    function checkStudent() public view returns (string memory) {
        return helper.checkStudent(Orgaganisations, msg.sender);
    }

    function addStudentUniqueID(uint256 _id) public {
        Organisation org = getOrganisation();
        org.addStudentId(_id);
    }

    // addcertificate to student
    function addCertificate(
        string memory _ipfs,
        string memory _merklee,
        uint256 cUnique,
        address sUnique
    ) public {
        Student s = helper.getStudent(Orgaganisations, msg.sender, sUnique);
        s.addCertificate(_ipfs, _merklee, cUnique, sUnique, msg.sender); // add certificate
    }

    // getstudentdetail
    function getStudentDetail(address addr)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            address,
            uint256
        )
    {
        return helper.getStudentDetail(Orgaganisations, stToOrg[addr], addr);
    }

    function requestAcess(uint256 _id, address _orgAdd) public {
        helper.requestAcess(Orgaganisations, _id, msg.sender, _orgAdd);
    }

    function checkAcess(uint256 _id, address _orgAdd)
        public
        view
        returns (string memory)
    {
        return helper.checkAcess(Orgaganisations, _id, msg.sender, _orgAdd);
    }

    function requests(uint256 _id, address stu)
        public
        view
        returns (address[] memory)
    {
        return helper.requests(Orgaganisations, msg.sender, stu, _id);
    }

    function giveAcess(address stu, uint256 _id) public {
        return helper.giveAcess(Orgaganisations, _id, stu, msg.sender);
    }

    // function addCompany(string memory _name) public {
    //     Company c = new Company();
    //     c.addCompany(_name, msg.sender);
    //     Companies.push(c);
    // }
}
