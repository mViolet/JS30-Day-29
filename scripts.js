//followed along with Wes mostly for this one

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]'); //anything with a data-time attribute


function timer(seconds) {
	//clear any existing timers first
	clearInterval(countdown);

	const now = Date.now();  //ne static method on Date object called .now
	const then = now + seconds * 1000; // *1000 because now is in ms
	// console.log({now, then}); //object gives details on each!

	//display initial time left, and end time
	displayTimeLeft(seconds);
	displayEndTime(then);

	//display time every second
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000); //divide by 1000 to get back to seconds
		//check if we should stop the interval
		if(secondsLeft < 0) {
			clearInterval(countdown); //stops the interval
			return;				      //leaves function
		}
		//display it
	 	displayTimeLeft(secondsLeft);
	}, 1000); // 1000ms = 1s
}

//display the time left initially, before 1s has elapsed
function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	console.log({minutes, remainderSeconds});
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`; //can we use padStart()??
	// console.log(display);
	document.title = display; //updates the title
	timerDisplay.textContent = display;
}

//takes a timestamp for when you want to end the task
function displayEndTime(timestamp) {
	const end = new Date(timestamp); //convert the ms to a properly formatted date
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {

	const seconds = parseInt((this.dataset.time)); //gives an obj w/ the time on it, and the string attached to it, use parseInt to conv to int
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
	e.preventDefault(); //prevents page refresh
	const mins = this.minutes.value; //the form's minutes value
	console.log(mins);
	timer(mins * 60);
	this.reset(); //c;lears value from input field
});