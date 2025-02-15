import { create } from "zustand"

type Entry = {
	id: string
	isChecked: boolean
	text: string
}

export type TNote = {
	id: string
	title?: {
		id: string
		text: string
	}
	content: Entry[]
}

type NotesStore = {
	notes: TNote[]
	addNote: (note: TNote) => void
	addNoteEntry: (noteId: string, value: Entry) => void
	checkNoteItem: (noteId: string, itemId: string) => void
	checkAllNotes: (noteId: string) => void
	getNotesCount: (noteId: string) => number
	getCheckedNotesCount: (noteId: string) => number
	updateNoteItem: (noteId: string, itemId: string, newValue: string) => void
	updateNoteTitle: (noteId: string, newValue: string) => void
	deleteNoteItem: (noteId: string, itemId: string) => void
	deleteNote: (id: string) => void
	findNote: (text: string) => TNote
}

const useNotesStore = create<NotesStore>((set, get) => ({
	notes: localStorage.getItem("todoapp-notes")
		? JSON.parse(localStorage.getItem("todoapp-notes")!)
		: [],
	addNote: (note) =>
		set((state) => {
			localStorage.setItem(
				"todoapp-notes",
				JSON.stringify([note, ...state.notes])
			)
			return { notes: [note, ...state.notes] }
		}),
	addNoteEntry: (noteId, value) =>
		set((state) => {
			const noteIndex = state.notes.findIndex(
				(note) => note.id === noteId
			)
			const note = state.notes[noteIndex]
			const updatedNote = {
				...note,
				content: [value, ...note.content],
			}
			const updatedNotes = state.notes
				.slice(0, noteIndex)
				.concat(updatedNote)
				.concat(state.notes.slice(noteIndex + 1))
			localStorage.setItem("todoapp-notes", JSON.stringify(updatedNotes))
			return { notes: updatedNotes }
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
	checkAllNotes: (noteId) =>
		set((state) => {
			const noteIndex = state.notes.findIndex(
				(item) => item.id === noteId
			)
			const note = state.notes[noteIndex]

			const updatedNote = {
				...note,
				content: note.content.map((item) => ({
					...item,
					isChecked: true,
				})),
			}
			const updatedNotes = state.notes
				.slice(0, noteIndex)
				.concat(updatedNote)
				.concat(state.notes.slice(noteIndex + 1))
			localStorage.setItem("todoapp-notes", JSON.stringify(updatedNotes))
			return { notes: updatedNotes }
		}),
	updateNoteItem: (noteId, itemId, newValue) =>
		set((state) => {
			const noteIndex = state.notes.findIndex(
				(note) => note.id === noteId
			)
			const note = state.notes[noteIndex]
			const updatedNote = {
				...note,
				content: note.content.map((item) =>
					item.id === itemId
						? { ...item, text: newValue.trimEnd() }
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
	updateNoteTitle: (noteId, newValue) =>
		set((state) => {
			const noteIndex = state.notes.findIndex(
				(note) => note.id === noteId
			)
			const note = state.notes[noteIndex]
			const updatedNote = {
				...note,
				title: { id: note.title?.id || "", text: newValue },
			}
			const updatedNotes = state.notes
				.slice(0, noteIndex)
				.concat(updatedNote)
				.concat(state.notes.slice(noteIndex + 1))
			localStorage.setItem("todoapp-notes", JSON.stringify(updatedNotes))
			return { notes: updatedNotes }
		}),
	getNotesCount: (noteId) => {
		const currentNote = get().notes.filter((item) => item.id === noteId)
		return currentNote[0].content.length
	},
	getCheckedNotesCount: (noteId) => {
		const currentNote = get().notes.filter((item) => item.id === noteId)
		return currentNote[0].content.filter((item) => item.isChecked === true)
			.length
	},
	deleteNoteItem: (noteId, itemId) => {
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
		})
		// check if there are entries left in the note
		// if not then delete the note
		const noteIndex = get().notes.findIndex((note) => note.id === noteId)
		const note = get().notes[noteIndex]
		const entriesCount = note.content.length

		if (entriesCount === 0) {
			get().deleteNote(noteId)
		}
	},
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
	findNote: (textValue) => {
		const note = get().notes.filter(
			(item) => item.title?.text === textValue
		)
		return note[0]
	},
}))

export default useNotesStore
