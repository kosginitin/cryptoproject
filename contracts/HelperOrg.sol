// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
import "./Organisation.sol";
import "./Student.sol";
import "./Company.sol";
import "./OverAll.sol";
import "./Company.sol";

contract HelperOrg {
    function getStudentDetail(
        Organisation[] memory Orgaganisations,
        address _orgAddress,
        address stAddres
    )
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
        Organisation org = getOrganisation(Orgaganisations, _orgAddress);
        for (uint256 k = 0; k < org.noOfStudents(); k++) {
            if (org.students(k).student_acc_address() == stAddres) {
                return (
                    org.students(k).student_name(),
                    org.students(k).student_unique_id(),
                    org.organisationName(),
                    org.students(k).student_acc_address(),
                    org.students(k).noOfCertificates()
                );
            }
        }

        return ("", 0, "", address(0), 0);
    }

    function checkOrganisation(
        Organisation[] memory organisations,
        address _addr
    ) public view returns (string memory) {
        for (uint256 i = 0; i < organisations.length; i++) {
            if (organisations[i].organisationAddress() == _addr) {
                return organisations[i].organisationName();
            }
        }
        return "no";
    }

    function getOrganisation(
        Organisation[] memory Orgaganisations,
        address _orgAddress
    ) public view returns (Organisation) {
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            if (Orgaganisations[i].organisationAddress() == _orgAddress) {
                return Orgaganisations[i];
            }
        }
    }

    function totalCertificates(Organisation org) public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < org.noOfStudents(); i++) {
            total += org.students(i).noOfCertificates();
        }
        return total;
    }

    function getOrganisationDetails(
        Organisation[] memory Orgaganisations,
        address add
    )
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
        Organisation org = getOrganisation(Orgaganisations, add);

        return (
            org.organisationName(),
            add,
            org.noOfUniqueIds(),
            org.noOfStudents(),
            totalCertificates(org)
        );
    }

    function checkStudent(Organisation[] memory Orgaganisations, address add)
        public
        view
        returns (string memory)
    {
        for (uint256 i = 0; i < Orgaganisations.length; i++) {
            for (uint256 j = 0; j < Orgaganisations[i].noOfStudents(); j++) {
                if (
                    Orgaganisations[i].students(j).student_acc_address() == add
                ) {
                    return "yes";
                }
            }
        }
        return "no";
    }

    function getStudent(
        Organisation[] memory Orgaganisations,
        address add,
        address suinque
    ) public view returns (Student) {
        Organisation org = getOrganisation(Orgaganisations, add);
        for (uint256 i = 0; i < org.noOfStudents(); i++) {
            if (org.students(i).student_acc_address() == suinque) {
                return org.students(i);
            }
        }
    }

    function checkAcess(
        Organisation[] memory Organisations,
        uint256 _id,
        address student,
        address _org
    ) public view returns (string memory) {
        Student st = getStudent(Organisations, _org, student);
        return st.hasAcess(student, _id);
    }

    function requestAcess(
        Organisation[] memory Organisations,
        uint256 _id,
        address student,
        address _org
    ) public {
        Student st = getStudent(Organisations, _org, student);
        st.requestAcess(student, _id);
    }

    function requests(
        Organisation[] memory Organisations,
        address _org,
        address _stu,
        uint256 _id
    ) public view returns (address[] memory) {
        Student st = getStudent(Organisations, _org, _stu);
        return st.requests(_id);
    }

    function giveAcess(
        Organisation[] memory Organisations,
        uint256 _id,
        address student,
        address _org
    ) public {
        Student st = getStudent(Organisations, _org, student);
        st.giveAcess(student, _id);
    }
}
