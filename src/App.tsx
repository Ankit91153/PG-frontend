import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/custom/Sidebar";

function App() {
  return (
    <>
      <div className="flex min-h-screen relative">
        <Sidebar />
        <main className="flex-1 flex flex-col ">
        
          <section className="flex-1 bg-background p-6  ml-[4.5rem] md:ml-[15rem]">
            <Outlet/>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
