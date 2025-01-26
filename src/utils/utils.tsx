export const toCamelCase = (str: string) => {
	return str
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
		.join(" ")
}
