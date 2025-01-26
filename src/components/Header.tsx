import { Lightbulb, LightbulbOff } from "lucide-react"
import useThemeStore from "../utils/themeStore"
import { useEffect } from "react"

const Header = () => {
	const { isDarkTheme, toggleTheme } = useThemeStore()

	useEffect(() => {
		const rootElement = document.documentElement
		if (isDarkTheme) {
			rootElement.classList.remove("dark-theme")
		} else {
			rootElement.classList.add("dark-theme")
		}
	}, [isDarkTheme])

	const handleChange = () => {
		console.log("login")
	}

	return (
		<header className="header__container">
			<h1>Kind Reminder</h1>
			<div className="header__btn__container">
				<button className="login__button" onClick={handleChange}>
					Login
				</button>
				<button className="theme__toggle__button" onClick={toggleTheme}>
					{/* {isDarkMode ? <Lightbulb /> : <LightbulbOff />} */}
					{isDarkTheme ? <Lightbulb /> : <LightbulbOff />}
				</button>
			</div>
		</header>
	)
}

export default Header
