import Note from "./Note"
import Modal from "./Modal"
import { CirclePlus } from "lucide-react"
import { useState } from "react"
import useNotesStore from "../utils/notesStore"

const NoteContainer = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { notes } = useNotesStore()

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	return (
		<div className="content__container">
			{notes.length > 0 &&
				notes.map((note) => <Note key={note.id} note={note} />)}
			<button className="add__note__button" onClick={openModal}>
				<CirclePlus />
			</button>
			{isModalOpen && <Modal onClose={closeModal} />}
		</div>
	)
}

export default NoteContainer
