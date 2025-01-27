import { toCamelCase } from "../utils/utils.tsx"
import { ChevronsDown } from "lucide-react"
import { useState } from "react"
import useNotesStore, { TNote } from "../utils/notesStore.tsx"

const Note = ({ note }: { note: TNote }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const { deleteNote, deleteNoteItem, checkNoteItem } = useNotesStore()

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
			{note.title && (
				<div className="note__header">
					<h3 className="note__title">{note.title}</h3>
				</div>
			)}
			<ul
				className="note__content"
				style={
					isExpanded
						? { marginBottom: "8rem" }
						: { marginBottom: "3rem" }
				}
			>
				{note.content.map((item) => (
					<li key={item.id} className="note__text">
						{isExpanded && (
							<input
								type="checkbox"
								checked={item.isChecked}
								className="note__text__checkbox"
								onChange={() => checkNoteItem(note.id, item.id)}
							/>
						)}
						<p
							style={
								item.isChecked && !isExpanded
									? { textDecoration: "line-through" }
									: undefined
							}
						>
							{toCamelCase(item.text)}
						</p>
						{isExpanded && (
							<button
								className="note__text__deletebtn"
								onClick={() => deleteNoteItem(note.id, item.id)}
							>
								X
							</button>
						)}
					</li>
				))}
			</ul>
			{isExpanded === true && (
				<div className="note__content__options">
					<button className="mark__completed">
						Mark all as completed
					</button>
					<button
						className="delete__note"
						onClick={() => deleteNote(note.id)}
					>
						Delete Note
					</button>
				</div>
			)}
			<button
				className="expand__note__button"
				onClick={(e) => handleExpandNote(e)}
			>
				<ChevronsDown />
			</button>
		</div>
	)
}

export default Note
