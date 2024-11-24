import { useReadContract } from "wagmi";
import { EOValidatorABI } from "../utils";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { X } from "lucide-react";

export default function BrowseData() {
  const [records, setRecords] = useState([]);
  const [modalShow, setModalShow] = useState(null);

  const result = useReadContract({
    abi: EOValidatorABI,
    address: `${process.env.REACT_APP_SC_ADDRESS}`,
    functionName: "getRecords",
  });

  useEffect(() => {
    if (result.data) {
      setRecords(result.data);
      console.log(result.data);
    }
  }, [result.data]);

  const Modal = (record) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-zinc-800 p-5 rounded-md relative min-h-96 min-w-96 flex flex-col">
        <div
          className="absolute top-0 right-0 p-2 cursor-pointer z-50"
          onClick={() => {
            setModalShow(null);
          }}
        >
          <X color="#000000" />
        </div>
        <h1
          className="
            text-3xl
            font-bold
            text-blue-400
            mt-5
            text-center
          "
        >
          {record?.metadata.title}
        </h1>
        <div className="h-full flex-1 flex flex-col mt-4">
          <p className="text-sm">
            Date:{" "}
            {new Date(Number(record?.timestamp) * 1000).toLocaleDateString()}
          </p>
          <p className="text-sm">Uploader: {record?.owner}</p>
          <div
            className="flex-1 flex flex-col mt-6"
            style={{ overflowY: "auto" }}
          >
            <p className="text-lg">{record?.metadata.description}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <a
            href={`https://nftstorage.link/ipfs/${record?.ipfsHash}`}
            target="_blank"
            rel="noreferrer"
            download
          >
            <button className="bg-blue-500 text-white p-2 rounded">
              Download
            </button>
          </a>
          <button
            onClick={() => {
              setModalShow(null);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const showModal = (record) => {
    setModalShow(Modal(record));
  };

  return (
    <div className="flex justify-center items-center flex-col w-full">
      {modalShow}
      <h1 className="flex justify-center items-center p-2 rounded-md text-2xl font-bold text-blue-400 mt-5">
        Browse Available Data
      </h1>
      <div className="overflow-x-auto w-11/12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                className="hover cursor-pointer"
                onClick={() => {
                  showModal(record);
                }}
              >
                <th>{index + 1}</th>
                <td>{record.metadata.title}</td>
                <td>{record.metadata.description}</td>
                <td>
                  {new Date(
                    Number(record.timestamp) * 1000
                  ).toLocaleDateString()}
                </td>
                <td>
                  <a href={`/verify?hash=${record.hash}`}>Verify</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
