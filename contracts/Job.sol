pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Job {
    string public jobName;
    address public postedBy;
    address[] public appliedBy;
    uint256 public noOfApplied;
    uint256 public jobId;
    uint256 public salary;
    // string public jobDescription;
    string public jobLocation;
    string public jobType;
    string public companyName;
    address[] public rejected;
    address[] public notVerified;
    string[] public ipfsC;
    uint256[] public certificateIds;
    address public hired;

    bool public isActiv;

    // mapping(address => string) studentToIPFS;
    // mapping(address => uint256) studentToCertificateId;

    function addJob(
        string memory _jobName,
        address _postedBy,
        uint256 _salary,
        string memory _jobLocation,
        string memory _jobType,
        uint256 _jobid,
        string memory _companyName
    ) public {
        jobName = _jobName;
        postedBy = _postedBy;
        salary = _salary;
        jobLocation = _jobLocation;
        jobType = _jobType;
        jobId = _jobid;
        companyName = _companyName;
        isActiv = true;
    }

    function applyJob(
        address addr,
        string memory ipfs,
        uint256 cerId
    ) public {
        appliedBy.push(addr);
        ipfsC.push(ipfs);
        certificateIds.push(cerId);
        notVerified.push(addr);
        noOfApplied++;
    }

    function getRequests()
        public
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        return (appliedBy, ipfsC, certificateIds);
    }

    function reject(address addr) public {
        rejected.push(addr);

        for (uint256 i = 0; i < appliedBy.length; i++) {
            if (appliedBy[i] == addr) {
                // verified(addr);
                removeApplied(i);
                removeIpfs(i);
                removeCertificateId(i);
            }
        }
    }

    function removeApplied(uint256 index) public {
        for (uint256 j = index; j < appliedBy.length - 1; j++) {
            appliedBy[j] = appliedBy[j + 1];
        }
        appliedBy.pop();
    }

    function removeIpfs(uint256 index) public {
        for (uint256 j = index; j < ipfsC.length - 1; j++) {
            ipfsC[j] = ipfsC[j + 1];
        }
        ipfsC.pop();
    }

    function removeCertificateId(uint256 index) public {
        for (uint256 j = index; j < certificateIds.length - 1; j++) {
            certificateIds[j] = certificateIds[j + 1];
        }
        certificateIds.pop();
    }

    function remove(uint256 index) public {
        for (uint256 i = index; i < notVerified.length - 1; i++) {
            notVerified[i] = notVerified[i + 1];
        }
        notVerified.pop();
    }

    function checkVerification(address add)
        public
        view
        returns (string memory)
    {
        for (uint256 i = 0; i < notVerified.length; i++) {
            if (notVerified[i] == add) {
                return "Not Verified";
            }
        }
        return "Verified";
    }

    function verified(address addr) public {
        for (uint256 i = 0; i < notVerified.length; i++) {
            if (notVerified[i] == addr) {
                // for (uint256 j = i; j < notVerified.length; j++) {
                //     notVerified[j] = notVerified[j + 1];
                // }
                // notVerified.pop();
                // return "present";
                remove(i);
            }
        }
        // return "not present";
    }

    function jobStatus(address stu) public view returns (string memory status) {
        if (hired == stu) {
            return "HIRED";
        }
        for (uint256 i = 0; i < appliedBy.length; i++) {
            if (appliedBy[i] == stu) {
                return "APPLIED";
            }
        }
        for (uint256 i = 0; i < rejected.length; i++) {
            if (rejected[i] == stu) {
                return "REJECTED";
            }
        }
        return "NOT APPLIED";
    }

    function setHired(address add) public {
        hired = add;
        isActiv = false;
    }

    function isActive() public view returns (bool) {
        return isActiv;
    }
}
