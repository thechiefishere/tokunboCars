import { AppProvider } from "./context";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <AppProvider>
      <main>
        <Header />
        <Home />
      </main>
    </AppProvider>
  );
}

export default App;
