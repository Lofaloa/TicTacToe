/**
 * Represents a timer. It displays hours, minutes, seconds and milliseconds
 * at HTML with the corresponding id's.
 * 
 * For instance, <span id="minutes">00</span>:<span id="seconds">00</span>.
 * 
 * This timer can be used as a countdown if the option is set.
 * 
 * This timer can be auto stopping. Once the end reached, the player will stop.
 * 
 * By default, this timer has a duration of zero and no options are activated.
 */
class Timer {
 
	/**
	 * Constructs this timer.
	 * 
	 * @param {*} duration is the duration of this timer in milliseconds. 
	 * @param {*} isCountdown tells if this timer is a count down. 
	 * @param {*} isAutoStopping tells if this timer should stop when end is reached.
	 */
	constructor(duration = 0, isCountdown = false, isAutoStopping = false) {
		this._isCountdown = isCountdown;
		this._duration = duration;
		this._interval = null;
		if (this._isCountdown) {
			this._endTime = Date.now();
			this._startTime = this._endTime + this._duration;
		} else {
			this._startTime = Date.now();
			this._endTime = this._startTime + this._duration;
		}
		this._isAutoStopping = isAutoStopping;
	}

	//Gets the current time of the timer.
	get difference() {
		if (this._isCountdown) {
			return this._startTime - Date.now();
		} else {
			return Date.now() - this._startTime;
		}
	}

	//Extracts the milliseconds part from a time expressed in milliseconds.
	extractMilliseconds(duration) {
		return duration % 1000;
	}

	//Extracts the seconds part from a time expressed in milliseconds.
	extractSeconds(duration) {
		return parseInt((duration / 1000) % 60);
	}

	//Extracts the minutes part from a time expressed in milliseconds.
	extractMinutes(duration) {
		return parseInt((duration / (1000 * 60)) % 60);
	}

	//Extracts the hours part from a time expressed in milliseconds.
	extractHours(duration) {
		return parseInt((duration / (1000 * 60 * 60)) % 24);
	}

	//Converts a number to a string, if the number is composed of less than two
	//digits, a 0 is added in front of the lonely digit.
	NumberToString(n) {
		return (0 <= n && n < 10) ? "0" + n : n;
	}

	//Gets the milliseconds from the duration.
	get milliseconds() {
		return this.extractMilliseconds(this.difference);
	}

	//Gets the seconds from the duration.
	get seconds() {
		let seconds = this.extractSeconds(this.difference);
		return this.NumberToString(seconds);
	}

	//Gets the minutes from the duration.
	get minutes() {
		let minutes = this.extractMinutes(this.difference);
		return this.NumberToString(minutes);
	}

	//Gets the hours from the duration.
	get hours() {
		let hours = this.extractHours(this.difference);
		return this.NumberToString(hours);
	}

	//True if the timer has reached the end.
	get hasReachedEnd() {
		if (this._isCountdown) {
			return this._endTime > (this._endTime + this.difference);
		} else {
			return this._endTime < (this._startTime + this.difference);
		}
	}

	//Displays the current time (HMSM).
	display(hours, minutes, seconds, milliseconds) {
		$('#milliseconds').text(milliseconds);
		$('#seconds').text(seconds);
		$('#minutes').text(minutes);
		$('#hours').text(hours);
	}

	//Displays the current state of the timer.
	displayCurrentTime() {
		this.display(this.hours, this.minutes, this.seconds, this.milliseconds);
	}

	//Displays the end state of the timer.
	displayEndState() {
		if (this._isCountdown) {
			this.display("00", "00", "00", "00");
		} else {
			let h = this.NumberToString(this.extractHours(this._duration));
			let m = this.NumberToString(this.extractMinutes(this._duration));
			let s = this.NumberToString(this.extractSeconds(this._duration));
			let ml = this.NumberToString(this.extractMilliseconds(this._duration));
			this.display(h, m, s, ml);
		}
	}

	//Starts the timer.
	start() {
		this._interval = setInterval(() => {
			this.displayCurrentTime();
			if (this.isAutoStopping && this.hasReachedEnd) {
				this.stop();
			}
		}, 1);
	}

	//Stops the timer.
	stop() {
		clearInterval(this._interval);
		this.displayEndState();
	}
}