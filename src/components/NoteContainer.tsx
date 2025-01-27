import Note from "./Note"
import Modal from "./Modal"
import { CirclePlus } from "lucide-react"
// import { CirclePlus, Search } from "lucide-react"
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

	// const handleChange = () => {
	// 	const element = document.getElementById("header__search__area")
	// 	element?.classList.toggle("show")

	// 	const noteList = document.getElementsByClassName(
	// 		"note__container"
	// 	) as HTMLCollectionOf<HTMLDivElement>
	// 	// console.log(noteList)
	// 	for (const noteElement of Array.from(noteList)) {
	// 		noteElement.classList.remove("expanded")
	// 	}
	// }

	return (
		<div className="content__container">
			{notes.length > 0 &&
				notes.map((note) => <Note key={note.id} note={note} />)}
			{/* <div className="header__search__form">
				<div id="header__search__area">
					<input type="text" />
					<button>
						<Search />
					</button>
				</div>
				<button className="login__button" onClick={handleChange}>
					SEARCH
				</button>
			</div> */}
			<button className="add__note__button" onClick={openModal}>
				<CirclePlus />
			</button>
			{isModalOpen && <Modal onClose={closeModal} />}
		</div>
	)
}

export default NoteContainer
