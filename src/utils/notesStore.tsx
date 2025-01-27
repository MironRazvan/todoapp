import { create } from "zustand"

export type TNote = {
	id: string
	title?: string
	content: {
		id: string
		isChecked: boolean
		text: string
	}[]
}

type NotesStore = {
	notes: TNote[]
	addNote: (note: TNote) => void
	checkNoteItem: (noteId: string, itemId: string) => void
	deleteNoteItem: (noteId: string, itemId: string) => void
	deleteNote: (id: string) => void
}

const useNotesStore = create<NotesStore>((set) => ({
	notes: localStorage.getItem("todoapp-notes")
		? JSON.parse(localStorage.getItem("todoapp-notes")!)
		: [],
	addNote: (note) =>
		set((state) => {
			localStorage.setItem(
				"todoapp-notes",
				JSON.stringify([...state.notes, note])
			)
			return { notes: [...state.notes, note] }
		}),
	checkNoteItem: (noteId, itemId) =>
		set((state) => {
			const noteIndex = state.notes.findIndex(
				(note) => note.id === noteId
			)
			const note = state.notes[noteIndex]
			const updatedNote = {
				...note,
				content: note.content.map((item) =>
					item.id === itemId
						? { ...item, isChecked: !item.isChecked }
						: item
				),
			}
			const updatedNotes = state.notes
				.slice(0, noteIndex)
				.concat(updatedNote)
				.concat(state.notes.slice(noteIndex + 1))
			localStorage.setItem("todoapp-notes", JSON.stringify(updatedNotes))
			return { notes: updatedNotes }
		}),
	deleteNoteItem: (noteId, itemId) =>
		set((state) => {
			const noteIndex = state.notes.findIndex(
				(note) => note.id === noteId
			)
			const note = state.notes[noteIndex]
			const updatedNote = {
				...note,
				content: note.content.filter((item) => item.id !== itemId),
			}
			const updatedNotes = state.notes
				.slice(0, noteIndex)
				.concat(updatedNote)
				.concat(state.notes.slice(noteIndex + 1))

			localStorage.setItem("todoapp-notes", JSON.stringify(updatedNotes))
			return { notes: updatedNotes }
		}),
	deleteNote: (id) =>
		set((state) => {
			localStorage.setItem(
				"todoapp-notes",
				JSON.stringify(state.notes.filter((note) => note.id !== id))
			)
			return {
				notes: state.notes.filter((note) => note.id !== id),
			}
		}),
}))

export default useNotesStore
