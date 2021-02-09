import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key) => {
  // const [_key, { page }] = queryKey;
  // console.log(key.queryKey[1]);
  const getPage = key.queryKey[1];
  const res = await fetch(`https://swapi.dev/api/planets/?page=${getPage}`);

  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['planets', page], fetchPlanets, {
    staleTime: 0,
    // cacheTime: 10,
    onSuccess: () => console.log('Planets data fetched successfully...'),
  });
  // console.log(data);

  return (
    <div>
      <h1>Planets</h1>

      {status === 'loading' && <h2>Loading Planets data...</h2>}

      {status === 'error' && <h2>Error in fetching Planets data...</h2>}

      {status === 'success' && (
        <>
          {/* {(data.results = [])} */}
          <button
            onClick={() => setPage((page) => Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span>Page: {page}</span>
          <button
            onClick={() => setPage(!data || !data.next ? page : page + 1)}
            disabled={!data || !data.next}
          >
            Next Page
          </button>
          <div>
            {data.results.length > 0 ? (
              data.results.map((planet) => (
                <Planet key={planet.name} planet={planet} />
              ))
            ) : (
              <h2>No planets data available...</h2>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
