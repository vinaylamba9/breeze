import { useState } from "react";
import { MdInfo } from "react-icons/md";
import BreezeStepper from "@Components/breezeStepper/breezeStepper.components";
import StepperOne from "@Components/breezeStepper/stepperOne";
import StepperTwo from "@Components/breezeStepper/stepperTwo";
import CreateGroupProvider from "@Context/createGroupProvider";

const BreezeGroupChat = ({ userList }) => {
	const [currentStep, setCurrentStep] = useState(1);

	const handleNext = () => {
		setCurrentStep((prevStep) => prevStep + 1);
	};

	const handlePrev = () => {
		setCurrentStep((prevStep) => prevStep - 1);
	};
	const stepperMenu = [
		{
			label: "Step 1",
			component: (
				<StepperOne handleNext={handleNext} currentStep={currentStep} />
			),
		},
		{
			label: "Step 2",
			component: (
				<StepperTwo
					userList={userList}
					currentStep={currentStep}
					handlePrev={handlePrev}
				/>
			),
		},
	];
	return (
		<>
			<div className='w-90% mx-auto select-none'>
				<div className='mb-5'>
					<h2 className='text-fontsize-pearl text-color-darkTeal font-bold'>
						Create group chat
					</h2>

					<div className='text-sm text-gray-400 tracking-normal flex items-center gap-1'>
						<span>
							<MdInfo />
						</span>
						<span>Click on users to create chat.</span>
					</div>
				</div>
				<CreateGroupProvider>
					<BreezeStepper stepperList={stepperMenu} currentStep={currentStep} />
				</CreateGroupProvider>
			</div>
		</>
	);
};

export default BreezeGroupChat;
