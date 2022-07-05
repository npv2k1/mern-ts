import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
 import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from "react-query";
  import { ReactQueryDevtools } from "react-query/devtools";

import Todo from './components/todo/Todo';
  const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App
