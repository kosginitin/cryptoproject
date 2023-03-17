// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
import "./Organisation.sol";
import "./Student.sol";
import "./Company.sol";

contract OverAllTem {
    Organisation[] public Orgaganisations;

    Company[] public Companies;

    struct studentToOrganisation {
        address _studentAdd;
        address _orgAddress;
    }

    studentToOrganisation[] public studentToOrganisationArray;

    // student struct
    struct student {
        string name;
        address addr;
        uint256 studentUniqueId;
        uint256 noOfCertificates;
    }
    // certificate struct
    struct certificate {
        string name;
        uint256 uniqueId;
        address issuedTo;
        uint256 date;
        address issuedBy;
    }
    // organisation struct
    struct organisation {
        string name;
        address addr;
        // uint256 noOfStudents;
    }

    // function give student Address got org address
    function getStudentOrgAddress(address _stAddress)
        public
        view
        returns (address)
    {
        for (uint256 i = 0; i < studentToOrganisationArray.length; i++) {
            if (studentToOrganisationArray[i]._studentAdd == _stAddress) {
                return studentToOrganisationArray[i]._orgAddress;
            }
        }
        return address(0);
    }

    // function to get organisation by address
    function getOrganisationByAddress(address _orgAddress)
        public
        view
        returns (Organisation)
    {
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            if (Orgaganisations[i].organisationAddress() == _orgAddress) {
                return Orgaganisations[i];
            }
        }
    }

    // certificate functions--completed 
    function addCertificate(
        string memory _ipfs,
        string memory _merklee,
        uint256 cUnique,
        address sUnique
    ) public {
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            if (Orgaganisations[i].organisationAddress() == msg.sender) {
                for (
                    uint256 j = 0;
                    j < Orgaganisations[i].noOfStudents();
                    j++
                ) {
                    if (
                        Orgaganisations[i].students(j).student_acc_address() ==
                        sUnique
                    ) {
                        Orgaganisations[i].students(j).addCertificate(
                            _ipfs,
                            _merklee,
                            cUnique,
                            sUnique,
                            Orgaganisations[i].organisationAddress()
                        );
                    }
                }
            }
        }
        // add certificate
    }

    // get student detail by unique id for auth two--completed
    function getStudentDetail()
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
        for (uint256 i = 0; i < studentToOrganisationArray.length; i++) {
            if (studentToOrganisationArray[i]._studentAdd == msg.sender) {
                address _orgAddress = studentToOrganisationArray[i]._orgAddress;
                for (uint256 j = 0; j < Orgaganisations.length; j++) {
                    if (
                        Orgaganisations[j].organisationAddress() == _orgAddress
                    ) {
                        for (
                            uint256 k = 0;
                            k < Orgaganisations[j].noOfStudents();
                            k++
                        ) {
                            if (
                                Orgaganisations[j]
                                    .students(k)
                                    .student_acc_address() == msg.sender
                            ) {
                                return (
                                    Orgaganisations[i]
                                        .students(k)
                                        .student_name(),
                                    Orgaganisations[i]
                                        .students(k)
                                        .student_unique_id(),
                                    Orgaganisations[i].organisationName(),
                                    Orgaganisations[i]
                                        .students(k)
                                        .student_acc_address(),
                                    Orgaganisations[i]
                                        .students(k)
                                        .noOfCertificates()
                                );
                            }
                        }
                    }
                }
            }
        }
        return ("", 0, "", address(0), 0);
    }

    // add student ---completed
    function addStudent(
        string memory _name,
        uint256 _uid,
        address _orgAddr
    ) public {
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            if (Orgaganisations[i].organisationAddress() == _orgAddr) {
                Orgaganisations[i].addStudent(
                    _name,
                    _uid,
                    msg.sender,
                    _orgAddr
                );

                studentToOrganisationArray.push(
                    studentToOrganisation(msg.sender, _orgAddr)
                );
            }
        }
    }

    // add an company
    function addCompany(string memory _companyName) public {
        Company c = new Company();
        c.addCompany(_companyName, msg.sender);
        Companies.push(c);
    }

    // get allorganisation details --completed
    function getAllOrganisations() public view returns (organisation[] memory) {
        organisation[] memory orgs = new organisation[](Orgaganisations.length);
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            orgs[i].name = Orgaganisations[i].organisationName();
            orgs[i].addr = Orgaganisations[i].organisationAddress();
        }
        return orgs;
    }

    // addding organisation averall -completed
    function addOrganisation(string memory _organisationName) public {
        Organisation org = new Organisation();
        org.addOrganisation(_organisationName, msg.sender);
        Orgaganisations.push(org);
    }

    // checking Organisation present or not--completed 
    function checkOrganisation() public view returns (string memory) {
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            if (Orgaganisations[i].organisationAddress() == msg.sender) {
                return Orgaganisations[i].organisationName();
            }
        }
        return "no";
    }

    // checking student present or not---completed
    function checkStudent() public view returns (string memory) {
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            for (uint256 j = 0; j < Orgaganisations[i].noOfStudents(); j++) {
                if (
                    Orgaganisations[i].students(j).student_acc_address() ==
                    msg.sender
                ) {
                    return "yes";
                }
            }
        }
        return "no";
    }

    // to get organsiation object--completed 
    function getOrganisation() public view returns (Organisation) {
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            if (Orgaganisations[i].organisationAddress() == msg.sender) {
                return Orgaganisations[i];
            }
        }
    }

    // to getorganisation details in university profile--completed 

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
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            if (Orgaganisations[i].organisationAddress() == msg.sender) {
                return (
                    Orgaganisations[i].organisationName(),
                    msg.sender,
                    Orgaganisations[i].noOfUniqueIds(),
                    Orgaganisations[i].noOfStudents(),
                    totalCertificates()
                );
            }
        }
    }

    // returns all the students using struct --completed 

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

    // returns no of certificates issued to by organisation--complete
    function totalCertificates() public view returns (uint256) {
        Organisation org = getOrganisation();
        uint256 total = 0;
        for (uint256 i = 0; i < org.noOfStudents(); i++) {
            total += org.students(i).noOfCertificates();
        }
        return total;
    }

    // returns all the certificates issued to by organisation --completed 
    function getAllCertificates() public view returns (certificate[] memory) {
        Organisation org = getOrganisation();
        certificate[] memory allCertificates = new certificate[](
            totalCertificates()
        );
        uint256 k = 0;
        for (uint256 i = 0; i < org.noOfStudents(); i++) {
            for (uint256 j = 0; j < org.students(i).noOfCertificates(); j++) {
                certificate memory c = certificate(
                    org.students(i).certifications(j).studentName(),
                    org.students(i).certifications(j).certification_unique_id(),
                    org.students(i).certifications(j).issued_to(),
                    org.students(i).certifications(j).date(),
                    org.students(i).certifications(j).issuedBy()
                );
                allCertificates[k] = c;
                k++;
            }
        }
        return allCertificates;
    }

    // adds an unique id to organisation by the organisation--completed 

    function addStudentUniqueID(uint256 _id) public {
        Organisation org = getOrganisation();
        org.addStudentId(_id);
    }
}
