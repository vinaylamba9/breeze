import { useCallback, useEffect, useState } from "react";

const useAvatarColorGenerator = (
	name = "John Doe",
	saturation = 100,
	lightness = 80
) => {
	const [hexColor, setHexColor] = useState("");
	const [textColor, setTextColor] = useState("");
	/** needed in case of hsl  */
	const stringToHslColor = (str, s, l) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}

		const h = hash % 360;
		return `hsl(${h}, ${s}%, ${l}%)`;
	};

	const stringToHexColor = (str) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}

		const color = (hash & 0x00ffffff).toString(16);
		return `#${"00000".substring(0, 6 - color.length) + color}`;
	};

	const updateColor = useCallback(() => {
		const textColor = lightness > 50 ? "#000" : "#fff";
		const hexColor = stringToHexColor(name);

		setHexColor(hexColor);
		setTextColor(textColor);
	}, [name, lightness]);

	useEffect(() => {
		updateColor();
	}, [updateColor]);

	return [hexColor, textColor];
};

export default useAvatarColorGenerator;
