import { Route } from "react-router-dom";
import ChatScreen from "./screens/chatScreen";
import HomeScreen from "./screens/homeScreen";

function App() {
  return (
    <div>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/chats" component={ChatScreen} exact />
    </div>
  );
}

export default App;
