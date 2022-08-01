import { Redirect, Route } from "react-router-dom";
import Routes from "./constants/routes";
import ChatScreen from "./screens/chat/chatScreen";
import HomeScreen from "./screens/home/homeScreen";

function App() {
  return (
    <div>

      <Route path="/" exact >
        <Redirect to={Routes.LOGINROUTE} />
      </Route>
      <Route path="/chats" component={ChatScreen} exact />
      <Route path={Routes.SIGNUPROUTE} component={HomeScreen} exact />
      <Route path={Routes.LOGINROUTE} component={HomeScreen} exact />

    </div>
  );
}

export default App;
