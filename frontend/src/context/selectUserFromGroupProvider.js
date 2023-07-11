import { createContext, useContext, useState } from "react";
const SelectUserFromGroupContext = createContext();

const SelectUserFromGroupProvider = ({ children }) => {
	const [selectUserFromGroup, setSelectUserFromGroup] = useState(null);

	return (
		<SelectUserFromGroupContext.Provider
			value={{ selectUserFromGroup, setSelectUserFromGroup }}>
			{children}
		</SelectUserFromGroupContext.Provider>
	);
};

export const useSelectUserFomGroupState = () =>
	useContext(SelectUserFromGroupContext);
export default SelectUserFromGroupProvider;
