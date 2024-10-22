import axios from "axios";
import Search from "@/components/Search";
import Card from "@/components/Card";

type searchProps = { searchParams: { data: string | undefined }} // [key: string]: string | undefined

export default async function SearchPage({ searchParams }: searchProps) {
  const { data } = await axios.get(`http://www.omdbapi.com`, {
    params: {
      apikey: process.env.NEXT_PUBLIC_API_KEY,
      t: searchParams.data
    }
  });

  return (
    <div className="m-4">
    <Search />
    <div className="flex justify-center m-4">
      <Card id={data.imbdID} title={data.Title} imageUrl={data.Poster} year={data.Year} description={data.Plot} />
    </div>
    </div>
  );
}