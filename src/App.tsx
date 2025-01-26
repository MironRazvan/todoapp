import { CirclePlus } from "lucide-react"
import "./App.css"
import Header from "./components/Header"
import Note from "./components/Note"
import { useEffect, useState } from "react"

function App() {
	const [isDraggable, setIsDraggable] = useState(false)
	const handleClick = () => {
		console.log("add note")
	}

	useEffect(() => {
		const updateDraggable = () => {
			setIsDraggable(window.innerWidth > 430)
		}

		updateDraggable()
		window.addEventListener("resize", updateDraggable)

		return () => window.removeEventListener("resize", updateDraggable)
	}, [])

	return (
		<>
			<main className="page__container">
				<Header />
				<div className="content__container">
					<Note isDraggable={isDraggable} />
					<Note isDraggable={isDraggable} />
					<Note isDraggable={isDraggable} />
					<Note isDraggable={isDraggable} />
					<Note isDraggable={isDraggable} />
					<button className="add__note__button" onClick={handleClick}>
						<CirclePlus />
					</button>
				</div>
			</main>
		</>
	)
}

export default App
