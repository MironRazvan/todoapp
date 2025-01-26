import { useState } from "react"
import useNotesStore, { TNote } from "../utils/notesStore"
import { nanoid } from "nanoid"

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
			console.log(targetElement.value)
			setNewNote((prevNote) => ({
				...prevNote,
				content: [...prevNote.content, listItem],
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

	console.log(newNote)

	return (
		<div className="modal__overlay">
			<div className="modal">
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
				<input
					type="text"
					className="input__listitem"
					id="input__listitem"
					placeholder="CARROTS"
					onChange={(e) => setListItem(e.target.value)}
				/>
				<button className="add__item" onClick={handleAddNewItem}>
					Add
				</button>
				<button className="close__modal" onClick={onClose}>
					Close
				</button>
				<button className="add__note" onClick={handleAddNewNote}>
					Add Note
				</button>
			</div>
		</div>
	)
}

export default Modal
