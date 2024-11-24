import { useEffect, useState } from "react";
import { pinata, hashFile, EOValidatorABI } from "../utils";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  serialize,
} from "wagmi";

export default function UploadData() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ title: "", description: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContract, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  const account = useAccount();

  const submitData = async () => {
    if (!file || !metadata.title || !metadata.description) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    setLoading(true);

    const upload = await pinata.upload.file(file);

    if (!upload.IpfsHash) {
      setErrorMessage("Error uploading file");
      setLoading(false);
      return;
    }

    const hash = await hashFile(file);
    console.log(hash);

    await writeContractAsync({
      address: `${process.env.REACT_APP_SC_ADDRESS}`,
      abi: EOValidatorABI,
      functionName: "addRecord",
      args: [hash, metadata, upload.IpfsHash],
    });

    setLoading(false);
    // console.log(upload)
  };

  useEffect(() => {
    setErrorMessage("");
  }, [file, metadata.title, metadata.description]);

  useEffect(() => {
    console.log(isConfirmed);
    console.log(isConfirming);
    console.log(hash);
  }, [isConfirmed, isConfirming, hash]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className="w-full p-2 min-h-96">
      {loading || isConfirming ? (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <h1 className="p-2 rounded-md text-2xl font-bold text-blue-400 mt-5">
            Upload your data
          </h1>
          <div className="flex flex-col mt-4">
            <div>
              <p className="mb-2 text-blue-400 ">
                Upload your file here:
              </p>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <p className="mt-10 text-blue-400 ">Metadata:</p>
            <div className="flex flex-col gap-4 mt-4">
              <label className="input input-bordered flex w-full max-w-xs">
                <input
                  type="text"
                  className="grow"
                  placeholder="Title"
                  value={metadata.title}
                  onChange={(e) =>
                    setMetadata({ ...metadata, title: e.target.value })
                  }
                />
              </label>
              <label className="input input-bordered flex w-full max-w-xs">
                <input
                  type="text"
                  className="grow"
                  placeholder="Description"
                  value={metadata.description}
                  onChange={(e) =>
                    setMetadata({ ...metadata, description: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="w-full flex justify-center items-center mt-10 flex-col gap-2">
              <button
                className="btn btn-outline btn-wide text-blue-400 mt-5 max-w-sm flex justify-center items-center "
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.returnValue = false;
                  submitData();
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                Submit data
              </button>
              {errorMessage && (
                <div className="text-red-500 text-center">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
