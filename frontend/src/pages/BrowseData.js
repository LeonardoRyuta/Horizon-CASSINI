export default function BrowseData() {
  return (
    <div className="flex justify-center items-center flex-col w-full">
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
              <th>Download</th>
              <th>Verify</th>

            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Title1</td>
              <td>Description1</td>
              <td>Date1</td>
              <td></td>

            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Title2</td>
              <td>Descripiton2</td>
              <td>Date2</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Title3</td>
              <td>Descripiton3</td>
              <td>Date3</td>
            </tr>
            {/* row 4 */}
            <tr>
              <th>4</th>
              <td>Title4</td>
              <td>Descripiton4</td>
              <td>Date4</td>
            </tr>{/* row 5 */}
            <tr>
              <th>5</th>
              <td>Title5</td>
              <td>Descripiton5</td>
              <td>Date5</td>
            </tr>{/* row 6 */}
            <tr>
              <th>6</th>
              <td>Title6</td>
              <td>Descripiton6</td>
              <td>Date6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}