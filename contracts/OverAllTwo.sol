// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
import "./Organisation.sol";
import "./Student.sol";
import "./Company.sol";
import "./HelperTwo.sol";

contract OverAllTwo {
    Company[] companies;
    HelperTwo public helper = new HelperTwo();
    struct jobSt {
        string jobName;
        uint256 jobId;
        address postedBy;
        uint256 salary;
        uint256 noOfApplied;
        bool isActive;
        string companyName;
    }

    mapping(address => uint256[]) studentToApplied;
    mapping(address => uint256[]) studentToRejected;
    mapping(address => uint256[]) studentToHired;
    mapping(uint256 => address) jobToCompany;

    function addCompany(string memory _name) public {
        Company c = new Company();
        c.addCompany(_name, msg.sender);
        companies.push(c);
    }

    function addJob(
        string memory _jobName,
        uint256 _salary,
        string memory _jobLocation,
        string memory _jobType,
        uint256 _jobid
    ) public {
        for (uint256 i = 0; i < companies.length; i++) {
            if (companies[i].companyAddress() == msg.sender) {
                companies[i].addJob(
                    _jobName,
                    msg.sender,
                    _salary,
                    _jobLocation,
                    _jobType,
                    _jobid
                );
            }
        }
        jobToCompany[_jobid] = msg.sender;
    }

    function checkCompany() public view returns (string memory) {
        return helper.checkCompany(companies, msg.sender);
    }

    function applyJob(
        address _companyAddress,
        uint256 _jobid,
        string memory ipfs,
        uint256 cerId
    ) public {
        Company c = helper.getCompany(companies, _companyAddress);
        c.applyJob(_jobid, msg.sender, ipfs, cerId);
        studentToApplied[msg.sender].push(_jobid);
    }

    function studentApplied() public view returns (uint256[] memory) {
        return studentToApplied[msg.sender];
    }

    function studentRejected() public view returns (uint256[] memory) {
        return studentToRejected[msg.sender];
    }

    function studentHired() public view returns (uint256[] memory) {
        return studentToHired[msg.sender];
    }

    function getRequests(uint256 _jobid)
        public
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        Company c = helper.getCompany(companies, msg.sender);
        return c.getRequests(_jobid);
    }

    function verified(uint256 _jobid, address addr) public {
        Company c = helper.getCompany(companies, msg.sender);
        c.verified(_jobid, addr);
        // return c.companyName();
    }

    function setHired(uint256 _jobid, address addr) public {
        Company c = helper.getCompany(companies, msg.sender);
        c.setHired(_jobid, addr);
        // studentToHired[msg.sender].push(_jobid);
    }

    function checkVerification(uint256 _jobid, address addr)
        public
        view
        returns (string memory)
    {
        Company c = helper.getCompany(companies, msg.sender);
        return c.checkVerification(_jobid, addr);
    }

    function rejected(uint256 _jobid, address addr) public {
        Company c = helper.getCompany(companies, msg.sender);
        c.rejected(_jobid, addr);
    }

    function isActive(uint256 _jobid) public view returns (bool) {
        Company c = helper.getCompany(companies, msg.sender);
        return c.isActive(_jobid);
    }

    function getAllJobs() public view returns (jobSt[] memory) {
        jobSt[] memory allJobs = new jobSt[](helper.totalJobs(companies));
        uint256 k = 0;
        for (uint256 i = 0; i < companies.length; i++) {
            for (uint256 j = 0; j < companies[i].noOfJobs(); j++) {
                jobSt memory jb = jobSt(
                    companies[i].jobs(j).jobName(),
                    companies[i].jobs(j).jobId(),
                    companies[i].jobs(j).postedBy(),
                    companies[i].jobs(j).salary(),
                    companies[i].jobs(j).noOfApplied(),
                    companies[i].jobs(j).isActive(),
                    companies[i].companyName()
                );
                allJobs[k] = jb;
                k++;
            }
        }
        return allJobs;
    }

    function getSpecificJobs() public view returns (jobSt[] memory) {
        Company c = helper.getCompany(companies, msg.sender);
        jobSt[] memory allJobs = new jobSt[](c.noOfJobs());
        uint256 k = 0;

        for (uint256 j = 0; j < c.noOfJobs(); j++) {
            jobSt memory jb = jobSt(
                c.jobs(j).jobName(),
                c.jobs(j).jobId(),
                c.jobs(j).postedBy(),
                c.jobs(j).salary(),
                c.jobs(j).noOfApplied(),
                c.jobs(j).isActive(),
                c.companyName()
            );
            allJobs[k] = jb;
            k++;
        }
        return allJobs;
    }

    function getJob(uint256 _jobid)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            string memory
        )
    {
        Company c = helper.getCompany(companies, jobToCompany[_jobid]);
        for (uint256 i = 0; i < c.noOfJobs(); i++) {
            if (c.jobs(i).jobId() == _jobid) {
                return (
                    c.jobs(i).jobName(),
                    c.jobs(i).salary(),
                    c.jobs(i).jobLocation(),
                    c.jobs(i).jobType(),
                    c.companyName()
                );
            }
        }
    }

    function getCompanyDetails()
        public
        view
        returns (
            string memory,
            address,
            uint256,
            uint256
        )
    {
        return helper.getCompanyDetails(companies, msg.sender);
    }

    function jobStatus(uint256 _jobid, address company)
        public
        view
        returns (string memory)
    {
        Company c = helper.getCompany(companies, company);
        return c.jobStatus(_jobid, msg.sender);
    }
}
