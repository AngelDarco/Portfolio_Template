import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import CardsContainer from "./components/CardsContainer";
import Carousel from "./components/Carousel";
import StoreProvider from "./context/Context";

function App() {
  return (
    <div className="flex items-center min-w-96  w-full max-w-5xl  flex-col">
      <StoreProvider>
        <Header />
        <Main />
        <Carousel />
        <CardsContainer />
        <Footer />
      </StoreProvider>
    </div>
  );
}

export default App;
