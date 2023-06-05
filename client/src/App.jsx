import "./index.css";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <main className="font-bodyFont w-full h-screen bg-bodyColor text-textLight overflow-x-hidden overflow-y-scroll">
        <Navbar />
        <div className="h-[88vh] mx-auto w-full p-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            </Routes>
        </div>
      </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
