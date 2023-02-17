import {auth, googleProvider} from "../config/firebase-config"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import React from 'react';
import {FaGoogle} from 'react-icons/fa'; 
import "../components/authStyle.css" 
import friends from '../Images/friends.svg'
import nightGirl2 from '../Images/nightGirl2.svg'
 
export const Auth = ({isDark, setIsDark,  posLeft , posTop, signInEroor, setSignInEroor}) => {
	
	const [email, setEmail] = React.useState("");
	const [pass, setPass] = React.useState("");
	const [eyeTop, setEyeTop] = React.useState(""); 
	const [eyeLeft, setEyeLeft] = React.useState(""); 
	const signin = async () =>
	{
		try {
			await  createUserWithEmailAndPassword(auth, email, pass);
			setSignInEroor("");
		} catch(err) {
			JSON.stringify(err).search("email-already-in-use") !== -1 ? setSignInEroor("email already in use") :
			setSignInEroor("email or password is invalid !");
			// console.log("type => ", err);
			// JSON.stringify(err).search("email-already-in-use") !== -1 ? console.log("email already in use") :
			// console.log("email or password is invalid !");
			// console.error(err); 
		}
	}
	 
	const signInWithGoogle = async () =>
	{
		try {
			await  signInWithPopup(auth, googleProvider);
			localStorage.setItem("client", true);
			setSignInEroor("") 
		} catch(err) {
			console.error(err);
		}
	} 
	
	const logout = async() => {
		try { 
			await  signOut(auth);
		} catch(err) {
			console.error(err); 
		} 
	} 

	const tba3 =  (e) => { 
		setEyeLeft(e.clientX / 43); 
		setEyeTop((e.clientY / 33) > 4.1 ? (e.clientY / 33) + 4 : e.clientY / 33);
	}
	return ( <div className="authContainer"  >
		{/* <div className="face"><div className="eyeContainer">
			<span className="eye"
			style={{top:eyeTop, left:eyeLeft}}></span>
		</div></div>   */}
		<div className="reservedForImg"></div>  
		<div className="friends" style={{left:`${posLeft}%` , top:`${posTop - 51}%`,
		backgroundImage: isDark ? `url(${nightGirl2})` : `url(${friends})`}}></div> 
		<div className="signInError">{signInEroor !== "" ? signInEroor  : ""}</div>
		<input  placeholder="email" onChange={(e) => setEmail(e.target.value)}
		className={isDark ? 'darkInput' : ''} />  
		<input  placeholder="password" type="password"  onChange={(e) => setPass(e.target.value)} 
		className={isDark ? 'darkInput' : ''}/> 
		<button onClick={signin} className={isDark ? 'darkBtn' : ''}>Sign in</button> 
		<p className={isDark ? 'darkOr' : ''}>Or</p>   
		<button onClick={signInWithGoogle} className={isDark ? 'darkBtn' : ''}>Login with google <FaGoogle /></button>
	</div>)
}