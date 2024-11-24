import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { hashFile, EOValidatorABI } from "../utils";

export default function VerifyData() {
  const [file, setFile] = useState(null);
  const [verified, setVerified] = useState(false);
  const [checked, setChecked] = useState(false);

  const [result, setResult] = useState(null);

  const { data } = useReadContract({
    abi: EOValidatorABI,
    address: `${process.env.REACT_APP_SC_ADDRESS}`,
    functionName: 'verifyRecordNoId',
    args: file ? [hashFile(file)] : [],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setResult(data);
    }
  }, [data]);

  useEffect(() => {
    if (result) {
      setVerified(result);
      setChecked(true);
    }
  }, [result]);

  const submitData = () => {
    console.log(file);
    console.log(result);
  }

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
          <button className="btn btn-outline text-blue-400 max-w-sm" onClick={submitData}>
            Submit data
          </button>
        </div>
      </div>
      {verified && (
        <div>
          <p className="mt-10 ml-5 text-blue-400 ">Validation result:</p>
          <div className="flex flex-col gap-4 mt-4 w-9/11">
            <div className="stats stats-vertical shadow flex flex-col gap-4 mt-4 ">
              <div className="stat">
                <div className="stat-title">Status</div>
                <div className="stat-value">Authentic</div>
              </div>

              <div className="stat">
                <div className="stat-title">Timestamp</div>
                <div className="stat-value">2024-11-22 14:00:00</div>
              </div>

              <div className="stat">
                <div className="stat-title">Hash</div>
                <div className="stat-value">0xabc123</div>
              </div>

              <div className="stat">
                <div className="stat-title">View on Etherscan</div>
                <a
                  className="text-blue-400 stat-value"
                  href="https://www.w3schools.com/html/default.asp"
                >
                  Etherscan
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
