import { useCallback, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreezeButton from "@Components/breezeButton/breezeButton.components.jsx";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
import BreezeToggleOnboard from "@Components/breezeToggleOnboard/breezeToggleOnboard.components.jsx";
import useIconToggle from "@Shared/hooks/useIconToggle.js";
import {
	PasswordIconAiFillEye,
	PasswordIconAiFillEyeInvisible,
} from "@Shared/utils/toggleIcon.utils.js";
import TypewriterLabel from "@Components/breezeTypewriter/breezeTypewriterLabel.components.jsx";
import { userDAO } from "@/modules/onboarding/core/userDAO.js";
import { HTTPStatusCode } from "@Constants/network";
import { EmailRegEx, InputType } from "@Constants/application";
import { useNavigate } from "react-router-dom";
import BreezeRoutes from "@Constants/routes";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";

const Signup = () => {
	const [togglePasswordVisibility, onTogglePassword] = useIconToggle();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	useEffect(() => {
		let login = BreezeSessionManagement.getAPIKey();
		if (login) navigate(BreezeRoutes.CHATROUTE);
		else {
			navigate(BreezeRoutes.SIGNUPROUTE);
		}
	}, [navigate]);

	return (
		<div className=' flex flex-col animate-fadeIn'>
			<ToastContainer />
			<BreezeToggleOnboard
				label={"Already a user? "}
				linkLabel='Login'
				link={BreezeRoutes.LOGINROUTE}
			/>
			<center>
				<div className='mt-10% w-60% text-fontsize-brittle mx-auto  '>
					<TypewriterLabel label='Signup with ' />
					<div className='my-5'></div>

					<BreezeButton
						backgroundColor={`var(--color-darkTeal)`}
						textColor={`var(--text-color-purity)`}
						label='Get Started'
						// onClickHandler={handleSubmit(loginHandler)}
					/>
					<p>Or</p>
					<BreezeButton
						icon={
							"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687718507/google_w2quk4.png"
						}
						backgroundColor={`var(--text-color-purity)`}
						textColor={`var(--text-color-dark)`}
						label='Log in with Google'
						onClickHandler={() =>
							toast.info("Features is coming soon!.", {
								transition: Slide,
								icon: "🚀",
								style: {
									borderRadius: "1rem",
									color: "var(--color-darkTeal)",
									boxShadow:
										"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
								},
								progressStyle: { background: "var(--color-darkTeal)" },
							})
						}
					/>
				</div>
			</center>
		</div>
	);
};

export default Signup;
