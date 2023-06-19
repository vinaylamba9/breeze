import { Redirect, Route } from "react-router-dom";
import Routes, { navigateToComponent } from "./constants/routes";
import HomeScreen from "./screens/home/homeScreen";
import { ProtectedRoutes } from "utils/protectedUtils";
import Layout from "screens/Layout/layout";

function App() {
	return (
		<div>
			<Route
				path={Routes.CHATROUTE}
				element={<ProtectedRoutes Component={Layout} />}>
				{Object.entries(navigateToComponent).map(([path, component]) => {
					return <Route exact key={path} element={component} path={path} />;
				})}
			</Route>
			<Route path='/' exact>
				<Redirect to={Routes.LOGINROUTE} />
			</Route>

			<Route path={Routes.SIGNUPROUTE} component={HomeScreen} exact />
			<Route path={Routes.LOGINROUTE} component={HomeScreen} exact />
			{/* <Route path={Routes.FORGOTPASSWORDROUTE} component={HomeScreen} exact /> */}
			<Route path={Routes.OTPVERIFICATIONROUTE} component={HomeScreen} exact />
			<Route path={Routes.UPDATEPASSWORDROUTE} component={HomeScreen} exact />
		</div>
	);
}

export default App;
