import Note from "./Note"
import { nanoid } from "nanoid"
import { CirclePlus } from "lucide-react"

type Note = {
	id: string
	title: string
	content: string[]
}

const NoteContainer = () => {
	const handleClick = () => {
		console.log("add note")
	}

	return (
		<div className="content__container">
			{[...Array(5)].map(() => (
				<Note key={nanoid()} />
			))}
			<button className="add__note__button" onClick={handleClick}>
				<CirclePlus />
			</button>
		</div>
	)
}

export default NoteContainer
