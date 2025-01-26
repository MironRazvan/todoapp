import { toCamelCase } from "../utils/utils.tsx"
import { ChevronsDown } from "lucide-react"
import { useState } from "react"

const Note = () => {
	const [isExpanded, setIsExpanded] = useState(false)
	const content = "this IS a string"

	const handleExpandNote = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()
		const currentContainer = e.currentTarget.closest(
			".note__container"
		) as HTMLDivElement
		currentContainer.classList.toggle("expanded")
		setIsExpanded((prev) => !prev)
	}

	return (
		<div className="note__container">
			<div className="note__header">
				<h3 className="note__title">TITLE</h3>
			</div>
			<div className="note__content">
				<p className="note__text">{toCamelCase(content)}</p>
			</div>
			{isExpanded === true && (
				<div className="note__content__options">
					<button className="mark__completed">
						Mark all as completed
					</button>
					<button className="delete__note">Delete Note</button>
				</div>
			)}
			<button
				className="expand__note__button"
				onClick={(e) => handleExpandNote(e)}
			>
				<ChevronsDown />
			</button>
		</div>
		// </Draggable>
	)
}

export default Note
