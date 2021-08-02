import {
  QueryClientProvider,
  QueryClient,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Home from './pages/Home/Home';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools
        initialIsOpen={true}
      />
    </QueryClientProvider>
  );
}

export default App;
