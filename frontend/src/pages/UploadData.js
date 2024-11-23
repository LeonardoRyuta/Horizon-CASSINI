import { useEffect } from "react";

export default function UploadData() {
  const test = process.env.REACT_APP_TEST;
  useEffect(() => {
    console.log(test)
  }, []);

  return (
    <body >
      <div>
        <button
          onClick={() => {
            console.log(test)
          }}
        >
          test
        </button>
        <header>
          <h2 className="h2">
            Upload Your Data
          </h2>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </body>
  );
}