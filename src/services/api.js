import axios from 'axios';


const postConfig = {
	header: {
		'Content-Type': 'application/json'
	}
}

export const postData = (url, body) => {
	axios
		.post(url, body)
		.then(response => console.log(response));
}

