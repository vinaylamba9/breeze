import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Layout from "./screens/Layout/layout";
import ChatProvider from "context/chatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ChatProvider>
		<BrowserRouter>
			{/* <Layout>
				<App />
			</Layout> */}
			<App />
		</BrowserRouter>
	</ChatProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
