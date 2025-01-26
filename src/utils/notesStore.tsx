import { create } from "zustand"

export type TNote = {
	id: string
	title?: string
	content: string[]
}

type NotesStore = {
	notes: TNote[]
	addNote: (note: TNote) => void
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
