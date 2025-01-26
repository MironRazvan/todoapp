import Draggable from "react-draggable"
import { toCamelCase } from "../utils/utils.tsx"
import { ChevronsDown } from "lucide-react"

const Note = ({ isDraggable }: { isDraggable: boolean }) => {
	const content = "this IS a string"

	const handleExpandNote = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		const currentContainer = e.currentTarget.parentElement as HTMLDivElement
		currentContainer.classList.toggle("expanded")
	}

	return (
		<Draggable disabled={!isDraggable}>
			<div className="note__container">
				<div className="note__header">
					<h3 className="note__title">TITLE</h3>
				</div>
				<div className="note__content">
					<p className="note__text">{toCamelCase(content)}</p>
				</div>
				<button
					className="expand__note__button"
					onClick={(e) => handleExpandNote(e)}
				>
					<ChevronsDown />
				</button>
			</div>
		</Draggable>
	)
}

export default Note
