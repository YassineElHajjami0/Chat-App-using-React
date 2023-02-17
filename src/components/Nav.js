import "../components/Nav.css"
import lastWhiteLogo from "../Images/lastWhiteLogo.png"
import newBni9a from "../Images/newBni9a.png" 
import {MdOutlineDarkMode} from 'react-icons/md'
import {BsFillSunFill} from 'react-icons/bs'
import { useState } from "react"

export const Nav = ({isDark , setIsDark}) => {
	const [animate, setAnimate] = useState(false);
	function Ani(e) { 
		setAnimate(true);
		setIsDark(!isDark);
		setTimeout(() => {
			setAnimate(false);
		}, 700)
	}
	return (
		<nav> 
			<img className="logo" src={ isDark ? lastWhiteLogo :newBni9a } />  
			<div className="window">
				<span style={{backgroundColor : isDark ? " #e26c17d9" : "#86c7d4"}} ></span>
				<span style={{backgroundColor : isDark ? " #e26c17d9" : "#86c7d4"}}></span>
				<span style={{backgroundColor : isDark ? " #e26c17d9" : "#86c7d4"}}></span> 
			
			</div> 
			<ul className={isDark ? "darkLi" : ''}> 
				<li  
				 onClick={(e) => {Ani(e)}}> {isDark ?  <BsFillSunFill className={animate ? "theme rotateIcon":"theme" }/> : <MdOutlineDarkMode className={animate ? "theme rotateIcon":"theme" }/>}  </li>
			</ul>
		</nav> 
	)
}  