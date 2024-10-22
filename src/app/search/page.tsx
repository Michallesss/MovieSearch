import { instance } from "../constants/instance";
import Search from "@/components/Search";
import Card from "@/components/Card";

type searchProps = { searchParams: { data: string | undefined }} // [key: string]: string | undefined

export default async function SearchPage({ searchParams }: searchProps) {
  const [data, error] = await instance.get(`http://www.omdbapi.com`, {
    params: {
      t: searchParams.data
    }
  })
  .then((res) => {
    if (res.data.Error) 
      return [undefined, res.data.Error];
    return [res.data, undefined];
  })
  .catch((err) =>  [undefined, err.message]);
  
  return (
    <div className="m-4">
      <Search />
      <div className="flex justify-center m-4">
        {error ? error : <Card id={data.imdbID} title={data.Title} imageUrl={data.Poster} year={data.Year} description={data.Plot} />}
      </div>
    </div>
  );
}