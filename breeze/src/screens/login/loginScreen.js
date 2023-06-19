import { useCallback, useEffect, useRef, useState } from "react";
import Button from "components/button/button";
import InputField from "components/inputField/inputField";
import ToggleOnBoard from "components/toggleOnboard/toggleOnBoard";
import Routes from "constants/routes";
import useIconToggle from "hooks/useIconToggle";
import {
	PasswordIconAiFillEye,
	PasswordIconAiFillEyeInvisible,
} from "utils/utilsIcon";
import { ValidateInput } from "constants/inputValidators";

import TypewriterLabel from "components/typewriterLabel/typewriterLabel";
import GoogleIcon from "assets/images/google.png";

import { userDAO } from "core/user/userDAO";
import { HTTPStatusCode } from "constants/network";
import { _isNull } from "utils/basicUtils";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputType } from "constants/application";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserSessionManagementController } from "core/sessionManagement/userSessionManagementController";
const LoginScreen = () => {
	const [togglePasswordVisibility, onTogglePassword] = useIconToggle();
	const [toastComponent, setToastComponent] = useState(null);
	const history = useHistory();

	// const userLoginInfo = useRef({
	// 	email: "",
	// 	password: "",
	// });
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	const onForgotPasswordClickHandler = () => {
		history.push(Routes.UPDATEPASSWORDROUTE);
	};

	const loginHandler = async (d) => {
		const response = await userDAO.loginDAO({
			email: d?.email,
			password: d?.password,
		});
		console.log(response, "-response");
		if (response?.statusCode === HTTPStatusCode.OK) {
			history.push(Routes.CHATROUTE);
		} else if (response?.statusCode === HTTPStatusCode.BAD_REQUEST) {
			return toast.error(response?.responseBody?.errors?.[0]?.msg, {
				transition: Slide,

				style: {
					borderRadius: "1rem",
					color: "var(--color-darkTeal)",
					boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				},
				progressStyle: { background: "var(--danger-color)" },
			});
		} else if (
			response?.statusCode === HTTPStatusCode.UNAUTHORIZED ||
			response?.statusCode === HTTPStatusCode.NOT_FOUND
		) {
			return toast.error(response?.responseBody, {
				transition: Slide,

				style: {
					borderRadius: "1rem",
					color: "var(--color-darkTeal)",
					boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				},
				progressStyle: { background: "var(--danger-color)" },
			});
		}
	};
	const navigate = useHistory();
	useEffect(() => {
		let login = UserSessionManagementController.getAPIKey();
		if (login) navigate.push(Routes.CHATROUTE);
	}, [navigate]);

	return (
		<div className='flex flex-col animate-fadeIn'>
			<ToastContainer />
			<center>
				<div className='mt-10% text-fontsize-brittle'>
					<TypewriterLabel label='Log in with ' />
					<InputField
						type={InputType.EMAIL}
						name='email'
						register={register}
						errors={errors}
						validationSchema={{
							required: "please enter the email.",
						}}
						placeholder='* Email'
						required
					/>
					<InputField
						register={register}
						errors={errors}
						validationSchema={{
							required: "please enter the password.",
						}}
						name='password'
						type={
							togglePasswordVisibility ? InputType.PASSWORD : InputType.TEXT
						}
						trailingIcon={
							togglePasswordVisibility ? (
								<PasswordIconAiFillEyeInvisible />
							) : (
								<PasswordIconAiFillEye />
							)
						}
						iconClickHandler={onTogglePassword}
						placeholder='password'
						required
					/>

					<div
						onClick={onForgotPasswordClickHandler}
						className='cursor-pointer text-fontsize-brittle font-medium opacity-80 text-color-darkTeal ml-40% mb-5%'>
						<p>
							<b>* Forgot Password?</b>{" "}
						</p>
					</div>
					<Button
						backgroundColor={`var(--color-darkTeal)`}
						textColor={`var(--text-color-purity)`}
						label='Get Started'
						onClickHandler={handleSubmit(loginHandler)}
					/>
					<p>Or</p>
					<Button
						icon={GoogleIcon}
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
					{toastComponent && toastComponent}
				</div>
			</center>
		</div>
	);
};

export default LoginScreen;
