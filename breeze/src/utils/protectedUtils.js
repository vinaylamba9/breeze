import { useEffect } from "react";
import Routes from "constants/routes";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserSessionManagementController } from "core/sessionManagement/userSessionManagementController";

export const ProtectedRoutes = ({ Component }) => {
	const history = useHistory();

	useEffect(() => {
		const checkStatus = async () => {
			let login = UserSessionManagementController.getAPIKey();
			if (!login) {
				let deletedResponse =
					UserSessionManagementController.deleteAllSession();
				if (deletedResponse) {
					history.push(Routes.LOGINROUTE);
				}
			}
		};
		checkStatus();
	}, [history]);
	return <Component />;
};
