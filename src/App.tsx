import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import CardsContainer from "./components/CardsContainer";
import Carousel from "./components/Carousel";
import { Route, Switch } from "wouter";
import Admin from "./components/Admin";

function App() {
  return (
    <div className="flex items-center min-w-96  w-full max-w-5xl min-h-dvh flex-col">
      <Header />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/admin"} component={Admin} />
      </Switch>
      <Footer />
    </div>
  );
}

const Home = () => {
  return (
    <>
      <Main />
      <Carousel />
      <CardsContainer />
    </>
  );
};

export default App;
