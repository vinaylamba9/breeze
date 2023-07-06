import { useCallback, useState, useEffect } from "react";
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

const Login = () => {
	const [togglePasswordVisibility, onTogglePassword] = useIconToggle();
	const [toastComponent, setToastComponent] = useState(null);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	const onForgotPasswordClickHandler = () => {
		navigate(BreezeRoutes.UPDATEPASSWORDROUTE);
	};

	const loginHandler = useCallback(
		async (d) => {
			const response = await userDAO.loginDAO({
				email: d?.email,
				password: d?.password,
			});

			if (response?.statusCode === HTTPStatusCode.OK) {
				navigate(BreezeRoutes.CHATROUTE);
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
		},
		[navigate]
	);

	useEffect(() => {
		let login = BreezeSessionManagement.getAPIKey();

		if (login) navigate(BreezeRoutes.CHATROUTE);
	}, [navigate]);

	return (
		<div className='flex flex-col animate-fadeIn'>
			<ToastContainer />
			<BreezeToggleOnboard label={"Back to "} linkLabel='Signup' />
			<center>
				<div className='mt-10% text-fontsize-brittle'>
					<TypewriterLabel label='Log in with ' />
					<BreezeInputField
						type={InputType.EMAIL}
						name='email'
						register={register}
						trailingIcon={
							<MdEmail
								style={{
									color: `var(--color-darkTeal)`,
									fontSize: `var(--fontsize-glossy)`,
								}}
							/>
						}
						errors={errors}
						validationSchema={{
							required: "Invalid e-mail .",
							pattern: {
								value: EmailRegEx.email,
								message: "Invalid e-mail format",
							},
						}}
						placeholder='E-mail Address'
						required
					/>
					<BreezeInputField
						register={register}
						errors={errors}
						validationSchema={{
							required: "Invalid password .",
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
						placeholder='Password'
						required
					/>

					<div
						onClick={onForgotPasswordClickHandler}
						className='cursor-pointer text-fontsize-brittle font-medium opacity-80 text-color-darkTeal ml-40% mb-5%'>
						<p>
							<b>* Forgot Password?</b>{" "}
						</p>
					</div>
					<BreezeButton
						buttonClass={"mx-4 my-4 px-8 py-4"}
						backgroundColor={`var(--color-darkTeal)`}
						textColor={`var(--text-color-purity)`}
						label='Get Started'
						onClickHandler={handleSubmit(loginHandler)}
					/>
					<p>Or</p>
					<BreezeButton
						buttonClass={"mx-4 my-4 px-8 py-4"}
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
					{toastComponent && toastComponent}
				</div>
			</center>
		</div>
	);
};

export default Login;
