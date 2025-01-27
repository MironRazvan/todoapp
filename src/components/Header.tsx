import { Lightbulb, LightbulbOff } from "lucide-react"
import useThemeStore from "../utils/themeStore"
import { useEffect } from "react"

const Header = () => {
	const { isDarkTheme, toggleTheme } = useThemeStore()

	useEffect(() => {
		const rootElement = document.documentElement
		if (isDarkTheme) {
			rootElement.classList.add("dark-theme")
		} else {
			rootElement.classList.remove("dark-theme")
		}
	}, [isDarkTheme])

	return (
		<header className="header__container">
			<h1>Kind Reminder</h1>
			<div className="header__btn__container">
				<button className="theme__toggle__button" onClick={toggleTheme}>
					{isDarkTheme ? <Lightbulb /> : <LightbulbOff />}
				</button>
			</div>
		</header>
	)
}

export default Header
