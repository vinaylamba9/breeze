import { useCallback, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreezeButton from "@Components/breezeButton/breezeButton.components.jsx";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";

import useIconToggle from "@Shared/hooks/useIconToggle.js";
import {
	PasswordIconAiFillEye,
	PasswordIconAiFillEyeInvisible,
} from "@Shared/utils/toggleIcon.utils.js";
import { userDAO } from "@/modules/onboarding/core/userDAO.js";
import { HTTPStatusCode } from "@Constants/network";
import { EmailRegEx, InputType } from "@Constants/application";
import { Link, useNavigate } from "react-router-dom";
import BreezeRoutes from "@Constants/routes";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";

const Login = () => {
	const [togglePasswordVisibility, onTogglePassword] = useIconToggle();

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

			<div className='mt-2 cursor-pointer'>
				<img
					alt='breeze_logo'
					width={150}
					src='https://res.cloudinary.com/dtjqyp0r2/image/upload/v1690743542/Black_logo_-_no_background_cwsfs5.png'
				/>
			</div>
			<center>
				<div
					className='flex justify-center flex-col mt-5 '
					style={{ minHeight: "calc(90vh - 170px)" }}>
					<div className='mt-10% w-75% items-center  text-fontsize-brittle mx-auto  '>
						<div className=' text-fontsize-tough tracking font-semibold text-background-color-jade'>
							Welcome back !
						</div>
						<div className='mt-16  '>
							<div className='my-10'>
								<BreezeInputField
									type={InputType.EMAIL}
									name='email'
									register={register}
									trailingIcon={
										<MdEmail
											style={{
												color: `text-black`,
												fontSize: `var(--fontsize-glossy)`,
											}}
										/>
									}
									errors={errors}
									validationSchema={{
										required: "Please enter valid email .",
										pattern: {
											value: EmailRegEx.email,
											message: "Please enter valid email .",
										},
									}}
									placeholder='Email'
									required
								/>
							</div>
							<div className='mt-10 mb-5'>
								<BreezeInputField
									register={register}
									errors={errors}
									validationSchema={{
										required: "Please enter valid password .",
									}}
									name='password'
									type={
										togglePasswordVisibility
											? InputType.PASSWORD
											: InputType.TEXT
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
							</div>
							<div className=' -mt-2 mb-5 flex justify-end items-end   text-black '>
								<div
									className=' relative cursor-pointer ease-in-out duration-300'
									onClick={onForgotPasswordClickHandler}>
									Forgot Password ?
								</div>
							</div>
							<BreezeButton
								backgroundColor={`var(--background-color-dark)`}
								textColor={`var(--text-color-purity)`}
								label='Log in'
								onClickHandler={handleSubmit(loginHandler)}
							/>
							<center>
								<p>Or</p>
							</center>
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
							<center className='my-10'>
								<span className='text-gray-500 flex items-center justify-center gap-2'>
									Don't have an account ?{" "}
									<Link to={BreezeRoutes.SIGNUPROUTE}>
										<p className='text-black cursor-pointer hover:underline ease-in-out duration-300'>
											<b>Sign up</b>
										</p>
									</Link>
								</span>
							</center>
						</div>
					</div>
				</div>
			</center>
		</div>
	);
};

export default Login;
