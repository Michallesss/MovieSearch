import axios from "axios";

type searchProps = { params: { movieId: number }};

export default async function Search({ params }: searchProps) {
  const [data, error] = await axios.get(`http://www.omdbapi.com`, {
    params: {
      apikey: process.env.NEXT_PUBLIC_API_KEY,
      i: params.movieId
    }
  })
  .then((res) => {
    if (res.data.Error) 
      return [undefined, res.data.Error];
    return [res.data, undefined];
  })
  .catch((err) =>  [undefined, err.message]);

  if (error) return <div className="flex justify-center m-4">{error}</div>;
  
  return (
    <div className="flex justify-center m-4">
      <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center">
          <img className="rounded-t-lg" src={data.Poster} alt="" />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.Title} <sup>{data.Year}</sup></h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Director:</b> {data.Director}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Genre:</b> {data.Genre}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Description:</b> {data.Plot}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Actors:</b>
            <ul>
              {data.Actors.split(',').map((actor: string, index: number) => <li key={index}>{actor}</li>)}
            </ul>
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Ratings:</b> 
            <ul>
              {data.Ratings.map((rating: { Source: string, Value: string }, index: number) => <li key={index}>{rating.Source}: {rating.Value}</li>)}
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}