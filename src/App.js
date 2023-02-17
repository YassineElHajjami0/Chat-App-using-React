import './App.css';
import { Auth } from './components/auth';
import {db, auth} from './config/firebase-config'
import { getDocs , collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import { useEffect, useState , useRef} from 'react';
import { signOut } from 'firebase/auth';
import { Nav } from './components/Nav';
import darkimg from './Images/lastDark.jpg' 
import lightimg from './Images/bgg.jpg'
import { Room } from './components/room';
import camping from './Images/camping.svg'
import nightCamping from './Images/nightCamping.svg'
import { Chat } from './components/chat';
import {FaGithub} from 'react-icons/fa';
import {browserRouter, Routes, Route, BrowserRouter} from 'react-router-dom';
//imageeeeeeeeeeeeeesddddddddddddddddddddddddddddddddddddd

function App() {
	const [posLeft, setPosleft] = useState(50);
	const [posTop, setPosTop] = useState(50);
	const [isDark, setIsDark] = useState(false);
	const [signInEroor, setSignInEroor] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [room, setRoom] = useState("");
	const roomRef = useRef(null);
 
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 3000)
	})

	const tba3 =  (e) => {   
		setPosleft((e.clientX / 533) + 50 );    
		setPosTop((e.clientY  / 633) + 50 );  
	}

	const submitRoom = () => {
		setRoom(roomRef.current.value); 
	}

	const logOut = async () => {
		try { 
			await  signOut(auth);
			console.log("looogouuut")
			localStorage.removeItem("client"); 
			setRoom(null); 
		} catch(err) { 
			console.log(err);
			console.error(err); 
		}
	}

	return (
	<div className="App" onMouseMove={tba3} 
		style={{backgroundImage: isDark ? `url(${darkimg})` : `url(${lightimg})`, backgroundPosition: isDark? "center" : "left" }}>
			{!isLoading && 
			<>
			<Nav isDark={isDark} setIsDark={setIsDark}/> 
			{!localStorage.getItem("client") ? 
				<div className='auth' style={{left:`${posLeft}%` , top:`${posTop}%`}}>  
					<Auth isDark={isDark} setIsDark={setIsDark} posLeft={posLeft} posTop={posTop}
						signInEroor={signInEroor} setSignInEroor={setSignInEroor} />  
				</div>
				:  
				room ? <Chat room={room} setRoom={setRoom}  isDark={isDark} logOut={logOut}/> 
				:
				<div className='room'>
					<img loading="lazy" src={isDark? nightCamping :  camping} /> 
					<input required type="text" placeholder='Lbni9a' ref={roomRef}  /> 
					<button type='submit' className={isDark ? 'darkBtn' : ''}
					onClick={() => {submitRoom()}}>Go To Lbni9a </button>
				</div>
			}
			{!localStorage.getItem("client") ? "" :
				<footer style={{backgroundColor : isDark ? "rgb(142 70 20 / 42%)" : ""}}>
				Made by <a href='https://github.com/YassineElHajjami0'><FaGithub className={isDark ? "githubBtn githubDark" : "githubBtn"} /></a>
				</footer> 
				 } 
			</>
			}
			{isLoading && <div className='loading'>
					<span></span>
					<span></span>
					<span></span> 
					<span></span>
					<span></span>
					<h2>Loading ...</h2>
				</div>} 
		</div>  
	); 
} 

export default App;