// import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import UserList from './components/User/UserList';

function App() {
	// const [count, setCount] = useState(0)

	return (
		<>
			<SearchBar />
			<div>test</div>
			<UserList />
		</>
	);
}

export default App;
