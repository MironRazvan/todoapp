import { useState } from "react"
import useNotesStore, { TNote } from "../utils/notesStore"
import { nanoid } from "nanoid"
import { NotebookPen, X } from "lucide-react"

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

	return (
		<div className="modal__overlay">
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
						/>
						<button
							className="add__item"
							onClick={handleAddNewItem}
						>
							Add
						</button>
					</div>
					<div className="modal__listitems">
						{newNote.content.map((item) => (
							<p key={item.id}>{item.text}</p>
						))}
					</div>
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
