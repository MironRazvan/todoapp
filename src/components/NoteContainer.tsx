import Note from "./Note"
import Modal from "./Modal"
import { CirclePlus, Search } from "lucide-react"
import { useState } from "react"
import useNotesStore from "../utils/notesStore"

const NoteContainer = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [expandedNotes, setExpandedNotes] = useState<string[]>([])
	const [searchValue, setSearchValue] = useState<string>("")
	const { notes } = useNotesStore()

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const toggleNoteExpand = (id: string) => {
		setExpandedNotes((prev) =>
			prev.includes(id)
				? prev.filter((noteId) => noteId !== id)
				: [...prev, id]
		)
	}

	const handleSearchNote = (
		e: React.MouseEvent<HTMLButtonElement>,
		noteTitle: string
	) => {
		const temp = e.currentTarget.previousSibling as HTMLInputElement
		temp.value = ""
		const parentElement = e.currentTarget.closest("div")
		parentElement?.classList.remove("show")
		const foundNote = notes.filter(
			(note) =>
				note.title?.text.toLocaleLowerCase() ===
				noteTitle.toLocaleLowerCase()
		)

		if (foundNote.length > 0) {
			const matchingNotes = notes.filter(
				(note) =>
					note.title?.text.toLocaleLowerCase() ===
					foundNote[0]?.title?.text.toLocaleLowerCase()
			)
			setExpandedNotes(matchingNotes.map((note) => note.id))
		}

		setExpandedNotes(foundNote.map((note) => note.id))
	}

	const handleChange = () => {
		const element = document.getElementById("header__search__area")
		element?.classList.toggle("show")
		setExpandedNotes([])
	}

	return (
		<div className="content__container">
			{notes.length > 0 &&
				notes.map((note) => (
					<Note
						key={note.id}
						note={note}
						isExpanded={expandedNotes.includes(note.id)}
						onToggleExpand={() => toggleNoteExpand(note.id)}
					/>
				))}
			<div className="header__search__form">
				<div id="header__search__area">
					<input
						type="text"
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<button onClick={(e) => handleSearchNote(e, searchValue)}>
						<Search />
					</button>
				</div>
				<button className="login__button" onClick={handleChange}>
					SEARCH
				</button>
			</div>
			<button className="add__note__button" onClick={openModal}>
				<CirclePlus />
			</button>
			{isModalOpen && <Modal onClose={closeModal} />}
		</div>
	)
}

export default NoteContainer
