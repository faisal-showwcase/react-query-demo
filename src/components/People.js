import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async (key) => {
  const getPage = key.queryKey[1];
  const res = await fetch(`https://swapi.dev/api/people/?page=${getPage}`);

  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['people', page], fetchPeople, {
    onSuccess: () => console.log('People data fetched successfully...'),
  });
  // console.log(data);

  return (
    <div>
      <h1>People</h1>

      {status === 'loading' && <h2>Loading People data...</h2>}

      {status === 'error' && <h2>Error in fetching People data...</h2>}

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
              data.results.map((person) => (
                <Person key={person.name} person={person} />
              ))
            ) : (
              <h2>No person data available...</h2>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
