import "./App.css"
import Header from "./components/Header"
import NoteContainer from "./components/NoteContainer"

function App() {
	return (
		<>
			<main className="page__container">
				<Header />
				<NoteContainer />
			</main>
		</>
	)
}

export default App
