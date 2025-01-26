import { create } from "zustand"

type Theme = {
	isDarkTheme: boolean
	toggleTheme: () => void
}

const useThemeStore = create<Theme>((set) => ({
	isDarkTheme:
		localStorage.getItem("todoapp-theme") === "false"
			? false
			: true || false,
	toggleTheme: () => {
		set((state) => {
			const newTheme = state.isDarkTheme === true ? "false" : "true"
			localStorage.setItem("todoapp-theme", newTheme)
			return {
				isDarkTheme: state.isDarkTheme === true ? false : true,
			}
		})
	},
}))

export default useThemeStore
