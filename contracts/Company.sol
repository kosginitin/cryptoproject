pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "./Job.sol";

contract Company {
    string public companyName;
    address public companyAddress;
    Job[] public jobs;
    uint256 public noOfJobs;
    uint256 public date;

    function addCompany(string memory _companyName, address _addr) public {
        companyName = _companyName;
        companyAddress = _addr;
        date = block.timestamp;
    }

    function setHired(uint256 _jobId, address _hired) public {
        Job job = getJob(_jobId);
        job.setHired(_hired);
    }

    function isActive(uint256 _jobId) public view returns (bool) {
        Job job = getJob(_jobId);
        return job.isActive();
    }

    function getRequests(uint256 jobId)
        public
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        Job j = getJob(jobId);
        return j.getRequests();
    }

    function rejected(uint256 jobId, address addr) public {
        Job j = getJob(jobId);
        j.reject(addr);
    }

    function verified(uint256 jobId, address addr) public {
        Job j = getJob(jobId);
        j.verified(addr);
        // return j.jobName();
    }

    function checkVerification(uint256 jobId, address addr)
        public
        view
        returns (string memory)
    {
        Job j = getJob(jobId);
        return j.checkVerification(addr);
    }

    function addJob(
        string memory _jobName,
        address _postedBy,
        uint256 _salary,
        string memory _jobLocation,
        string memory _jobType,
        uint256 _jobid
    ) public {
        Job j = new Job();
        j.addJob(
            _jobName,
            _postedBy,
            _salary,
            _jobLocation,
            _jobType,
            _jobid,
            companyName
        );
        jobs.push(j);
        noOfJobs++;
    }

    function applyJob(
        uint256 _jobid,
        address addr,
        string memory ipfs,
        uint256 cerId
    ) public {
        Job j = getJob(_jobid);
        j.applyJob(addr, ipfs, cerId);
    }

    function getJob(uint256 _jobid) public view returns (Job j) {
        for (uint256 i = 0; i < jobs.length; i++) {
            if (jobs[i].jobId() == _jobid) {
                return jobs[i];
            }
        }
    }

    function jobStatus(uint256 _jobId, address st)
        public
        view
        returns (string memory status)
    {
        Job j = getJob(_jobId);
        return j.jobStatus(st);
    }
}
