import {
  QueryClientProvider,
  QueryClient,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Header from './components/Header/Header';
import Scenes from './pages/Scenes/Scenes';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='app'>
        <div className='app-container'>
          <Header />

          <Scenes />
        </div>
      </div>
      <ReactQueryDevtools
        initialIsOpen={true}
      // style={{backgroundColor: 'red'}}
      />
    </QueryClientProvider>
  );
}

export default App;
