import { useState, useEffect } from "react";
import { useReadContract, usePublicClient } from "wagmi";
import { hashFile, EOValidatorABI } from "../utils";
import { useSearchParams } from "react-router";

export default function VerifyData() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);
  const [verified, setVerified] = useState(false);
  const [checked, setChecked] = useState(false);
  const [record, setRecord] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("hash")) {
      setHash(searchParams.get("hash"));
    }
  }, [searchParams]);

  const client = usePublicClient();

  const contractRes = useReadContract({
    abi: EOValidatorABI,
    address: `${process.env.REACT_APP_SC_ADDRESS}`,
    functionName: "verifyRecordNoId",
    args: [hash],
    query: {
      notifyOnChangeProps: ["data"],
    },
  });

  const recordData = useReadContract({
    abi: EOValidatorABI,
    address: `${process.env.REACT_APP_SC_ADDRESS}`,
    functionName: "getRecordByHash",
    args: [hash],
    query: {
      notifyOnChangeProps: ["data"],
    },
  });

  useEffect(() => {
    if (contractRes && hash) {
      console.log(contractRes);
      setVerified(contractRes.data);
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [contractRes, hash]);

  useEffect(() => {
    if (recordData && hash) {
      setRecord(recordData.data);
      console.log("record state", recordData);
      // if (recordData.data) {
      //   console.log(EOValidatorABI);
      //   console.log(recordData.data);
      //   const rec = recordData.data;

      //   (async () => {
      //     const event = await client.getContractEvents({
      //       abi: EOValidatorABI,
      //       address: `${process.env.REACT_APP_SC_ADDRESS}`,
      //       eventName: "RecordAdded",
      //       args: [rec.id, rec.hash, rec.ipfsHash, rec.timestamp, rec.metadata, rec.owner],
      //     });

      //     console.log(event);
      //   })();
      // }
    }
  }, [recordData, hash]);

  const submitData = () => {
    hashFile(file).then((hash) => {
      setHash(hash);
    });
  };

  return (
    <div className="flex justify-center items-center flex-col w-full">
      <h1 className="flex justify-center items-center p-2 rounded-md text-2xl font-bold text-blue-400 mt-5">
        Verify your data
      </h1>
      <div>
        <p className="mt-10 ml-5 text-blue-400 ">Upload your file here:</p>
        <div className="flex gap-2 items-center justify-center mt-5">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="btn btn-outline text-blue-400 max-w-sm"
            onClick={submitData}
          >
            Submit data
          </button>
        </div>
      </div>
      {contractRes.isLoading ? (
        <div className="flex justify-center items-center h-96">
          {hash && <span className="loading loading-dots loading-lg"></span>}
        </div>
      ) : (
        checked && (
          <div>
            <p className="mt-10 ml-5 text-blue-400 ">Validation result:</p>
            <div className="flex flex-col gap-4 mt-4 w-9/11">
              <div className="stats stats-vertical shadow flex flex-col gap-4 mt-4 ">
                {verified ? (
                  <>
                    <div className="stat">
                      <div className="stat-title">Status</div>
                      <div className="stat-value">Authentic</div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Creation Date</div>
                      <div className="stat-value">
                        {new Date(
                          Number(record?.timestamp) * 1000
                        ).toLocaleTimeString()}
                        {", "}
                        {new Date(
                          Number(record?.timestamp) * 1000
                        ).toDateString()}
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Hash</div>
                      <div className="stat-value text-md">
                        {hash.substring(0, 10)}...
                        {hash.substring(hash.length - 10)}
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Owner</div>
                      <div className="stat-value text-md">
                        {record?.owner.substring(0, 10)}...
                        {record?.owner.substring(record?.owner.length - 10)}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="stat">
                      <div className="stat-title">Status</div>
                      <div className="stat-value text-red-700">Inauthentic</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Info</div>
                      <div className="stat-value text-md">
                        This data has either not been registered 
                        <br/>
                        or has been tampered with.
                      </div>
                    </div>
                  </>
                )}

                {/* <div className="stat">
                <div className="stat-title">View on Etherscan</div>
                <a
                  className="text-blue-400 stat-value"
                  href="https://www.w3schools.com/html/default.asp"
                >
                  Etherscan
                </a>
              </div> */}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
