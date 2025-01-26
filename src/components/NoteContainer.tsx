import Note from "./Note"
import Modal from "./Modal"
import { nanoid } from "nanoid"
import { CirclePlus } from "lucide-react"
import { useState } from "react"

type Note = {
	id: string
	title: string
	content: string[]
}

const NoteContainer = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	// const handleClick = () => {
	// 	console.log("add note")
	// }

	return (
		<div className="content__container">
			{[...Array(5)].map(() => (
				<Note key={nanoid()} />
			))}
			<button className="add__note__button" onClick={openModal}>
				<CirclePlus />
			</button>
			{isModalOpen && <Modal onClose={closeModal} />}
		</div>
	)
}

export default NoteContainer
