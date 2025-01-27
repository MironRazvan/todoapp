import { toCamelCase } from "../utils/utils.tsx"
import { ChevronsDown, Delete, Plus } from "lucide-react"
import { useState } from "react"
import useNotesStore, { TNote } from "../utils/notesStore.tsx"
import { nanoid } from "nanoid"

const Note = ({ note }: { note: TNote }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const [editingId, setEditingId] = useState<string | null>(null)
	const [newEntry, setNewEntry] = useState<string | null>(null)

	const {
		addNoteEntry,
		deleteNote,
		deleteNoteItem,
		checkNoteItem,
		checkAllNotes,
		getNotesCount,
		getCheckedNotesCount,
		updateNoteItem,
	} = useNotesStore()

	const isNoteCompleted =
		getCheckedNotesCount(note.id) === getNotesCount(note.id)

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

	const handleNoteItemEditing = (
		noteId: string,
		itemId: string,
		newText: string
	) => {
		updateNoteItem(noteId, itemId, newText)
		setEditingId(null)
	}

	const handleAddNewEntry = () => {
		const inputElement = document.getElementById(
			"note__add__entry__input"
		) as HTMLInputElement
		if (newEntry !== null) {
			addNoteEntry(note.id, {
				id: nanoid(),
				text: newEntry,
				isChecked: false,
			})
			inputElement.value = ""
		}
	}

	return (
		<div className="note__container">
			<div className="note__header">
				<h3
					className="note__title"
					style={
						isNoteCompleted && !isExpanded
							? { textDecoration: "line-through" }
							: undefined
					}
				>
					{note.title && note.title}
				</h3>
			</div>
			<ul
				className="note__content"
				style={
					isExpanded
						? { marginBottom: "10rem" }
						: { marginBottom: "3rem" }
				}
			>
				{note.content.map((item) => (
					<li key={item.id} className="note__text">
						{isExpanded && (
							<input
								type="checkbox"
								placeholder="Add another item..."
								checked={item.isChecked}
								className="note__text__checkbox"
								onChange={() => checkNoteItem(note.id, item.id)}
							/>
						)}
						{editingId === item.id && isExpanded ? (
							<input
								type="text"
								className="input__listitem"
								defaultValue={item.text}
								onBlur={(e) =>
									handleNoteItemEditing(
										note.id,
										item.id,
										e.target.value
									)
								}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleNoteItemEditing(
											note.id,
											item.id,
											(e.target as HTMLInputElement).value
										)
									}
								}}
								autoFocus
							/>
						) : (
							<p
								style={
									item.isChecked && !isExpanded
										? { textDecoration: "line-through" }
										: undefined
								}
								onClick={() => setEditingId(item.id)}
							>
								{toCamelCase(item.text)}
							</p>
						)}
						{isExpanded && (
							<div className="note__text__btn">
								<button
									className="note__text__deletebtn"
									onClick={() =>
										deleteNoteItem(note.id, item.id)
									}
								>
									<Delete />
								</button>
							</div>
						)}
					</li>
				))}
			</ul>
			{isExpanded === true && (
				<div className="note__content__options">
					<div className="note__add__entry">
						<input
							type="text"
							id="note__add__entry__input"
							onChange={(e) => setNewEntry(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleAddNewEntry()
								}
							}}
						/>
						<button onClick={() => handleAddNewEntry()}>
							<Plus />
						</button>
					</div>
					<button
						className="mark__completed"
						onClick={() => checkAllNotes(note.id)}
					>
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
			{isExpanded && (
				<div className="note__items__counter">
					<p>
						{getCheckedNotesCount(note.id)}/{getNotesCount(note.id)}
					</p>
				</div>
			)}
		</div>
	)
}

export default Note
