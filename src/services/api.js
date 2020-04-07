import axios from "axios";

const postConfig = {
	header: {
		'Content-Type': 'application/json'
	}
}

export const postData = (url, body, successCb) => {
	axios
		.post(url, body, postConfig)
		.then(response => {
			successCb(response.data);
		})
		.catch(error => {
			console.log(error)
		})
}


export const getData = (url, successCb) => {
	axios
		.get(url)
		.then(response => successCb(response.data))
		.catch(error => {
			console.error(error)
		})
}


const putConfig = {
	header: {
		'Content-Type': 'application/json'
	}
}

export const putData = (url, body, successCb) => {
	axios
		.put(url, body, putConfig)
		.then(response => successCb(response.data))
		.catch(error => {
			console.error(error)
		})
}


export const deleteRequest = (url, successCb) => {
	axios
		.delete(url)
		.then(response => successCb(response.data))
		.catch(error => {
			console.error(error)
		})
}