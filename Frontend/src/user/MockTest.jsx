import { Link } from 'react-router-dom';
import i0 from '../images/0.png'
import i1 from '../images/1.png'
import i2 from '../images/2.png'
import i3 from '../images/3.png'
import i4 from '../images/4.png'
import i11 from '../images/11.png'
import { useState, useEffect } from 'react'
//import { url } from "../common/constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
// import i5 from '../images/5.png'
// import i6 from '../images/6.png'
// import i7 from '../images/7.png'
// import i8 from '../images/8.png'

export default function App() {

	const isSignin = useSelector((state) => state.isSignin);
	const history = useHistory();
  
	  if(isSignin.status === false){
		  alert('please signin first!!')
		  history.push('/user/login')
		}

		useEffect(() => {
			const unloadCallback = (event) => {
			  event.preventDefault();
			  event.returnValue = "";
			  return "";
			};
			window.addEventListener("beforeunload", unloadCallback);
			return () => window.removeEventListener("beforeunload", unloadCallback);
		  }, []);

	const questions = [
		{
			questionText: 'What does this sign mean?',
			img:i2,
			flag:true,
			answerOptions: [
				{ answerText: 'No freeway', isCorrect: false },
				{ answerText: 'No parking', isCorrect: true },
				{ answerText: 'No right turn', isCorrect: false },
				//{ answerText: '7', isCorrect: true },
			],
		},
		{
			questionText: 'Near a pedestrian crossing,when the pedestrian are waiting to cross road, you should?',
			img:i11,
			flag:false,
			answerOptions: [
				{ answerText: 'Sound horn and proceed', isCorrect: false },
				{ answerText: 'Slow down ,sound horn and pass', isCorrect: false },
				{ answerText: 'Stop vehicle and wait till the pedestrian cross the road and then proceed', isCorrect: true },
				//{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'On a road that has been designated as one way ?',
			img:i11,
			answerOptions: [
				{ answerText: 'You should not drive in reverse gear', isCorrect: true },
				{ answerText: 'You should not overtake', isCorrect: false },
				{ answerText: 'You should not park', isCorrect: false },
				//{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'You can overtake a vehicle that is in the front?',
			img:i11,
			answerOptions: [
				{ answerText: 'Through the left side of the vehicle ahead', isCorrect: false },
				{ answerText: 'Through the right side of the vehicle ahead', isCorrect: false },
				{ answerText: 'If the road is wide enough', isCorrect: false },
				//{ answerText: '7', isCorrect: true },
			],
		},
		{

			questionText: 'A learner’s license is valid for a period of ?',
			img:i11,
			answerOptions: [
				{ answerText: '30 days', isCorrect: false },
				{ answerText: '6 months', isCorrect: true },
				{ answerText: 'Until a driving license is availed', isCorrect: false },
				//{ answerText: '7', isCorrect: true },
			],

		},
		{

			questionText: 'What does this sign mean?',
			img:i0,
			answerOptions: [
				{ answerText: 'No u-turn', isCorrect: false },
				{ answerText: 'No right turn', isCorrect: true },
				{ answerText: 'No freeway', isCorrect: false },
				//{ answerText: '7', isCorrect: true },
			],

		},
		{

			questionText: 'The following sign represents?',
			img:i1,
			answerOptions: [
				{ answerText: 'No left turn', isCorrect: false },
				{ answerText: 'No freeway', isCorrect: false },
				{ answerText: 'No U-Turn', isCorrect: true },
				//{ answerText: '7', isCorrect: true },
			],

		},
		{

			questionText: 'On a one-way road, you should not?',
			img:i11,
			answerOptions: [
				{ answerText: 'Over-speed', isCorrect: false },
				{ answerText: 'Park on the way', isCorrect: false },
				{ answerText: 'Drive in the reverse gear', isCorrect: true },
				//{ answerText: '7', isCorrect: true },
			],

		},
		{

			questionText: 'Overtaking is allowed only:?',
			img:i11,
			answerOptions: [
				{ answerText: 'From the right side', isCorrect: true },
				{ answerText: 'From the left side', isCorrect: false },
				{ answerText: 'After honking 3 times', isCorrect: false },
				//{ answerText: '7', isCorrect: true },
			],

		},
		{

			questionText: 'Vehicles used for transport can be differentiated through?',
			img:i11,
			answerOptions: [
				{ answerText: 'Vehicle’s colour', isCorrect: false },
				{ answerText: 'Vehicle’ number plate', isCorrect: true },
				{ answerText: 'Vehicle’s tyre size', isCorrect: false },
				//{ answerText: '7', isCorrect: true },
			],

		},
		{

			questionText: 'The following sign represents:',
			img:i3,
			answerOptions: [
				{ answerText: 'Stop', isCorrect: true },
				{ answerText: "Don't Stop", isCorrect: false },
				{ answerText: 'Hospital ahead', isCorrect: false },
				//{ answerText: '7', isCorrect: true },
			],

		},
		{

			questionText: 'The following sign represents:',
			img:i4,
			answerOptions: [
				{ answerText: 'Petrol pump', isCorrect: true },
				{ answerText: 'Parking lot - Taxis', isCorrect: false },
				{ answerText: 'Ferry', isCorrect: false },
				//{ answerText: '7', isCorrect: true },
			],

		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div>
			<div className="container-fluid p-1 my-3 bg-success text-white">
		<h1 style={{textAlign:"center"}}>eRTO System</h1>
		<p style={{textAlign:"center"}}>Welcome to the eRTO System.The
			place where transparency is the main moto.</p>
	</div>



	<nav
		className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
		<ul className="navbar-nav mr-auto">
		<li class="nav-item "> <Link className="nav-link" to={ { pathname: "/user/home"}}>Home</Link> </li>

			<li className="nav-item dropdown"><a
				className="nav-link dropdown-toggle active" href="#" id="navbardrop"
				data-toggle="dropdown"> License </a>
				<div className="dropdown-menu">
				<Link className="dropdown-item"  to={ { pathname: "/license/learning"}}>Learning License</Link>
				<Link className="dropdown-item"  to={ { pathname: "/license/permanent"}}>Permanent License</Link>
				</div></li>

			 {/* <li class="nav-item "><a class="nav-link"
				href="<spring:url value='/user/mocktest'/>">Mock Test </a></li> */}

			<li className="nav-item "><Link className="nav-link" to={ { pathname: "/user/status"}}>Status </Link></li>

		</ul>

		<ul className="navbar-nav ml-auto">
			<li className="nav-item"><a className="nav-link"
				href="/user/logout">
					<button type="button" className="btn btn-info btn-sm">Log Out</button>
			</a></li>

		</ul>
	</nav>


	<hr />
		<div className='app'>
			{/* <div><img src={i2}></img></div> */}
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
	
						<div className='question-img'><img className='imgggg' src={questions[currentQuestion].img} /></div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
		</div>
	);
}


// import { useHistory } from "react-router-dom";
// import { Component, useState } from 'react'
// import { Link } from 'react-router-dom'



// class Mocktest extends Component{

//     componentDidMount () {
//         const script = document.createElement("script");
//         script.src = "./mock.js";
//         script.async = true;
//         document.div.appendChild(script);
//     }
   


//     render() {
//         return(
//         <div className="">

//  <div className="container-fluid p-1 my-3 bg-success text-white">
// 		<h1 style={{textAlign:"center"}}>eRTO System</h1>
// 		<p style={{textAlign:"center"}}>Welcome to the eRTO System.The
// 			place where transparency is the main moto.</p>
// 	</div>



// 	<nav
// 		className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
// 		<ul className="navbar-nav mr-auto">
// 			<li className="nav-item"><a className="nav-link"
// 				href="/user/home">Home </a></li>

// 			<li className="nav-item dropdown"><a
// 				className="nav-link dropdown-toggle active" href="#" id="navbardrop"
// 				data-toggle="dropdown"> License </a>
// 				<div className="dropdown-menu">
// 					<a className="dropdown-item"
// 						href='/license/learning'>Learning
// 						License </a> <a className="dropdown-item"
// 						href="/license/permanent">Permanent
// 						License </a>
// 				</div></li>

// 			 {/* <li class="nav-item "><a class="nav-link"
// 				href="<spring:url value='/user/mocktest'/>">Mock Test </a></li> */}

// 			<li className="nav-item "><a className="nav-link"
// 				href="/user/status">Status </a></li>

// 		</ul>

// 		<ul className="navbar-nav ml-auto">
// 			<li className="nav-item"><a className="nav-link"
// 				href="/user/logout">
// 					<button type="button" className="btn btn-info btn-sm">Log Out</button>
// 			</a></li>

// 		</ul>
// 	</nav>


// 	<hr />

// <div className="container">
//     <div className="row">
//         <div className="col-md-12">
// <div className="card">
//   <div className="card-header"><h4 id="test_status"></h4></div>
//   <div className="card-body">
// <div id="test" ></div>
// </div>
// </div>
// </div>
// </div>
// </div>

// <hr />

//         </div>
//         )
//     }
// }

//export default Mocktest