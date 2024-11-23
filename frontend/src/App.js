import './App.css';

function App() {
  return (
    <body className="w-full p-2">
        <h1 className="flex justify-center items-center p-2 rounded-md text-2xl font-bold text-blue-400 mt-5">
          Upload your data
        </h1>
      <div>
        <p className="mt-10 ml-5 text-blue-400 ">Upload your file here:</p>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-5 ml-5 " />
      </div>
      <p className="mt-16 ml-5 text-blue-400 ">Metadata:</p>
      <div className='flex flex-col gap-4 mt-4'>
        <label className="input input-bordered flex w-full max-w-xs ml-5">
          <input type="text" className="grow" placeholder="Title" />
        </label>
        <label className="input input-bordered flex w-full max-w-xs ml-5">
          <input type="text" className="grow" placeholder="Description" />
        </label>
        <label className="input input-bordered flex w-full max-w-xs ml-5">
          <input type="text" className="grow" placeholder="Timestamp" />
        </label>
      </div>
      <div className="w-full flex justify-center mt-10">
        <button className="btn btn-outline btn-wide text-blue-400 mt-5 max-w-sm flex justify-center items-center ">Submit data</button>
      </div>
    </body>
  );
}

export default App;
