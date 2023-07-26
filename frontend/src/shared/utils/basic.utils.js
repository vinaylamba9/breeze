export const _isNull = function (value) {
	if (value === null || value === undefined || value === "") return true;
	else return false;
};
export const _isNotEmpty = function (value) {
	if (typeof value == "object") {
		if (Array.isArray(value)) {
			if (value != null && value !== undefined && value.length > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			if (value != null && value !== undefined) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		if (value != null && value !== undefined && value !== "") {
			return true;
		} else {
			return false;
		}
	}
};

export const DATE_UTILS = {
	getHours: (dateTime) => {
		let date = new Date(dateTime);
		date = date.toLocaleString("en-US");
		let splittedValue = date.split(",");

		return splittedValue[1];
	},
	getTodayDate: () => new Date()?.toLocaleDateString("en-US")?.split(",")?.[0],
	getDate: (dateTime) => {
		let date = new Date(dateTime);
		date = date.toLocaleString("en-US");
		let splittedValue = date.split(",");
		return splittedValue[0];
	},
	prefixZeroInTime: (hour) => (hour < 10 ? "0" + hour : hour),

	getTimeInHHMM: (dateTime) =>
		DATE_UTILS?.prefixZeroInTime(new Date(dateTime)?.getHours()) +
		":" +
		DATE_UTILS?.prefixZeroInTime(new Date(dateTime)?.getMinutes()),
};
