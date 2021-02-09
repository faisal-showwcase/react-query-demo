import { useState } from 'react';
import Navbar from './components/Navbar';
import People from './components/People';
import Planets from './components/Planets';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState('planets');

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <h1>React Query Star wars Info</h1>
        <Navbar setPage={setPage} />
        <div className='content'>
          {page === 'planets' ? <Planets /> : <People />}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
