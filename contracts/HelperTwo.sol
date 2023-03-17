// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
import "./Company.sol";
import "./Organisation.sol";

contract HelperTwo {
    function checkCompany(Company[] memory companies, address _addr)
        public
        view
        returns (string memory)
    {
        for (uint256 i = 0; i < companies.length; i++) {
            if (companies[i].companyAddress() == _addr) {
                return companies[i].companyName();
            }
        }
        return "no";
    }

    function getCompany(Company[] memory companies, address _addr)
        public
        view
        returns (Company)
    {
        for (uint256 i = 0; i < companies.length; i++) {
            if (companies[i].companyAddress() == _addr) {
                return companies[i];
            }
        }
    }

    function getCompanyDetails(Company[] memory companies, address _addr)
        public
        view
        returns (
            string memory,
            address,
            uint256,
            uint256
        )
    {
        Company com = getCompany(companies, _addr);
        return (com.companyName(), _addr, com.noOfJobs(), com.date());
    }

    function totalJobs(Company[] memory companies)
        public
        view
        returns (uint256)
    {
        uint256 total = 0;
        for (uint256 i = 0; i < companies.length; i++) {
            total += companies[i].noOfJobs();
        }
        return total;
    }
}
