type searchProps = { params: { movieId: number }}

export default function Search({ params }: searchProps) {
  return (
    <div>
      <h1>Movie {params.movieId}</h1>
      {/* Display data */}
    </div>
  );
}