import { useEffect, useState } from "react";
import { pinata, hashFile, EOValidatorABI } from "../utils"
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";

export default function UploadData() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ title: "", description: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({hash,})
  const account = useAccount();

  const submitData = async (e) => {
    e.preventDefault();
    if (!file || !metadata.title || !metadata.description) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    setLoading(true);

    // const upload = await pinata.upload.file(file)

    // if (!upload.IpfsHash) {
    //   setErrorMessage("Error uploading file");
    //   setLoading(false);
    //   return;
    // }

    const hash = await hashFile(file);
    console.log(hash);

    writeContract({
      address: "0x8Fd14fBf37352888EBfb5e40d236dEd12360D6b7",
      abi: EOValidatorABI,
      functionName: "addRecord",
      args: [hash, JSON.stringify(metadata), "0x"],
    })

    setLoading(false);  
    // console.log(upload)
  };

  useEffect(() => {
    setErrorMessage("");
  }, [file, metadata.title, metadata.description]);

  useEffect(() => {
    console.log(isConfirmed)
    console.log(isConfirming)
    console.log(hash)
  }, [isConfirmed, isConfirming, hash])

  return (
    <div className="w-full p-2 min-h-96">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <h1 className="flex justify-center items-center p-2 rounded-md text-2xl font-bold text-blue-400 mt-5">
            Upload your data
          </h1>
          <div>
            <p className="mt-10 ml-5 text-blue-400 ">Upload your file here:</p>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs mt-5 ml-5 "
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <p className="mt-16 ml-5 text-blue-400 ">Metadata:</p>
          <div className="flex flex-col gap-4 mt-4">
            <label className="input input-bordered flex w-full max-w-xs ml-5">
              <input
                type="text"
                className="grow"
                placeholder="Title"
                onChange={(e) =>
                  setMetadata({ ...metadata, title: e.target.value })
                }
              />
            </label>
            <label className="input input-bordered flex w-full max-w-xs ml-5">
              <input
                type="text"
                className="grow"
                placeholder="Description"
                onChange={(e) =>
                  setMetadata({ ...metadata, description: e.target.value })
                }
              />
            </label>
          </div>
          <div className="w-full flex justify-center items-center mt-10 flex-col gap-2">
            <button
              className="btn btn-outline btn-wide text-blue-400 mt-5 max-w-sm flex justify-center items-center "
              onClick={(e) => {submitData(e)}}
            >
              Submit data
            </button>
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
