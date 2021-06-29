import Trello from "./pages/Trello";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Trello />
      </Provider>
    </>
  );
}

export default App;
