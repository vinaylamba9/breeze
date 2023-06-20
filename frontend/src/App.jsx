import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BreezeRoutes, { preOnboardingRoutes } from "@Constants/routes.js";
import OnboardingLayout from "@Layout/onboarding.layout.jsx";

const App = () => (
	<div>
		<Routes>
			<Route
				exact
				path={BreezeRoutes.LANDINGROUTE}
				element={<Navigate replace to={BreezeRoutes.LOGINROUTE} />}
			/>
			<Route path={BreezeRoutes.LANDINGROUTE} element={<OnboardingLayout />}>
				{Object.entries(preOnboardingRoutes)?.map(([path, component]) => {
					return <Route exact key={path} element={component} path={path} />;
				})}
			</Route>
		</Routes>
	</div>
);
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("app")
);
