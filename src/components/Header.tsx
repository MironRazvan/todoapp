import { useState } from "react"
import { Lightbulb, LightbulbOff } from "lucide-react"

const Header = () => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	const handleChange = () => {
		const body = document.documentElement

		if (isDarkMode) {
			body.classList.remove("dark-theme")
			setIsDarkMode(false)
		} else {
			body.classList.add("dark-theme")
			setIsDarkMode(true)
		}
		// body.classList.toggle("dark-theme")
	}

	return (
		<header className="header__container">
			<h1>Kind Reminder</h1>
			<div className="header__btn__container">
				<button className="login__button" onClick={handleChange}>
					Login
				</button>
				<button
					className="theme__toggle__button"
					onClick={handleChange}
				>
					{isDarkMode ? <Lightbulb /> : <LightbulbOff />}
				</button>
			</div>
		</header>
	)
}

export default Header
