import { useEffect } from "react";
import BreezeRoutes from "constants/routes";
import { UserSessionManagementController } from "core/sessionManagement/userSessionManagementController";
import { useNavigate } from "react-router-dom";

export const ProtectedRoutes = ({ Component }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkStatus = async () => {
			let login = UserSessionManagementController.getAPIKey();
			if (!login) {
				let deletedResponse =
					UserSessionManagementController.deleteAllSession();
				if (deletedResponse) {
					navigate(BreezeRoutes.LOGINROUTE);
				}
			}
		};
		checkStatus();
	}, [navigate]);
	return <Component />;
};
