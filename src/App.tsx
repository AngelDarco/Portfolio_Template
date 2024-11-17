import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  return (
    <div className="flex min-w-96  w-full max-w-5xl border flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
