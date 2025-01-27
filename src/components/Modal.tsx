import { useState } from "react"
import useNotesStore, { TNote } from "../utils/notesStore"
import { nanoid } from "nanoid"
import { Delete, NotebookPen, X } from "lucide-react"

type ModalProps = {
	onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
	const { addNote } = useNotesStore()
	const [newNote, setNewNote] = useState<TNote>({
		id: "",
		title: "",
		content: [],
	})

	const [listItem, setListItem] = useState<string>("")

	const handleAddNewItem = () => {
		const targetElement = document.getElementById(
			"input__listitem"
		) as HTMLInputElement

		if (targetElement.value !== "") {
			setNewNote((prevNote) => ({
				...prevNote,
				content: [
					...prevNote.content,
					{ text: listItem, id: nanoid(), isChecked: false },
				],
			}))
			targetElement.value = ""
		}
	}

	const handleAddNewNote = () => {
		if (newNote.content.length > 0) {
			addNote({
				...newNote,
				id: nanoid(),
			})
			onClose()
		}
	}

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	const handleDeleteEntry = (itemId: string) => {
		setNewNote((prevNote) => ({
			...prevNote,
			content: prevNote.content.filter((item) => item.id !== itemId),
		}))
	}

	return (
		<div className="modal__overlay" onClick={(e) => handleOverlayClick(e)}>
			<div className="modal">
				<div className="modal__input__container">
					<input
						type="text"
						className="input__title"
						placeholder="SHOPPING LIST"
						onChange={(e) =>
							setNewNote((prevNote) => ({
								...prevNote,
								title: e.target.value,
							}))
						}
					/>
					<div className="modal__input__additem__container">
						<input
							type="text"
							className="input__listitem"
							id="input__listitem"
							placeholder="CARROTS"
							onChange={(e) => setListItem(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleAddNewItem()
								}
							}}
						/>
						<button
							className="add__item"
							onClick={handleAddNewItem}
						>
							Add
						</button>
					</div>
					<ul className="modal__listitems">
						{newNote.content.map((item) => (
							<li key={item.id}>
								<p>{item.text}</p>
								<button
									className="delete__entry"
									onClick={() => handleDeleteEntry(item.id)}
								>
									<Delete />
								</button>
							</li>
						))}
					</ul>
				</div>
				<div className="modal__button__container">
					<button
						className="add__note__modal__button"
						onClick={handleAddNewNote}
					>
						<NotebookPen />
						Add Note
					</button>
					<button className="close__modal__button" onClick={onClose}>
						<X />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Modal
