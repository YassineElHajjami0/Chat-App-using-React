import { useEffect, useState } from 'react';
import { db , auth } from '../config/firebase-config';
import {addDoc , collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore'
import './chat.css'  
 
export const Chat = ({room ,setRoom,isDark, logOut}) => {
	const [newMsg, setNewMsg] = useState("");
	const [msgsData, setMsgsData] = useState([]); 
	const collectionReference = collection(db, "messages");
	
	const handleSubmitForm =  async (e) => {
		e.preventDefault(); 
		if(newMsg === "") return ;
		try {
			await addDoc(collectionReference, {name :  auth.currentUser.displayName.split(' ')[0] , message : newMsg, createdAt : serverTimestamp(), room : room }); 
			setNewMsg(""); 
		} catch (err) { 
			console.error(err);
		}
	}

	useEffect(() => {
		const queryMessage = query(collectionReference, where("room", "==", room), orderBy("createdAt") );
		onSnapshot(queryMessage, (snapshot) => {
			let theMessages = [];
			snapshot.forEach((doc) => {
				theMessages.push({...doc.data(), id : doc.id})
			})
			console.log("heeeere");
			setMsgsData(theMessages);
		})

	}, [])

	return ( 
		<div className="chatContainer"> 
				<h1 style={{color: isDark ? "#ec9c63d9" : "aliceblue"}}>Welcome to {room} </h1> 
			<div className="msgs">
				{msgsData.map(msg => (<p key={msg.id}><span>{msg.name}</span>{msg.message}</p>))}
			</div> 
			<form className="inputContainer" onSubmit={handleSubmitForm}> 
				<input type='text' className="msgInput" onChange={(e) => {setNewMsg(e.target.value)}} value={newMsg}  />
				<button type='submit'  className={isDark ? "send darkSpan" : 'send'} >Send</button>
			</form>
			<div className='btnsContainer'>
			<button className={isDark ? 'logout darkLogout' : 'logout'}
			onClick={logOut} >Logout</button> 
			<button className='otherRoom' onClick={() => {setRoom(null)}}>other room</button>
			</div>
		</div> 
	) 
}