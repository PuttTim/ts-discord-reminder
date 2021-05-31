export default (FullDateMatch: RegExpMatchArray, error: (message: string) => void): Date | void => {
	const [_, day, month, year, hour, minute] = FullDateMatch
	const LongerMonths = [1, 3, 5, 7, 8, 10, 12]

	const dayInt = parseInt(day)
	const monthInt = parseInt(month)
	const yearInt = parseInt(year)
	const hourInt = parseInt(hour)
	const minuteInt = parseInt(minute)

	if (LongerMonths.includes(monthInt)) {
		if (dayInt > 31) return error(`This month cannot have ${dayInt} days`)
	} else {
		if (dayInt > 30) return error(`This month cannot have ${dayInt} days`)
	}

	if (monthInt > 12) return error(`A year cannot have ${monthInt} months`)

	if (yearInt < new Date().getFullYear()) return error("Year must not be in the past")
	if (yearInt - new Date().getFullYear() > 5) return error("Year must not be more than 5 years ahead")

	if (hourInt > 23) return error("Hour must not exceed 23")

	if (minuteInt > 59) return error("Minute must not exceed 59")

	// Handle timezone change
	if (new Date().getUTCHours() == new Date().getHours()) {
		let UTChour = hourInt - 8
		if (UTChour < 0) UTChour += 24
		return new Date(yearInt, monthInt - 1, dayInt, UTChour, minuteInt)
	}
	return new Date(yearInt, monthInt - 1, dayInt, hourInt, minuteInt)
}