import axios from "axios";

const postConfig = {
	header: {
		'Content-Type': 'application/json'
	}
}

export const postData = (url, body, successCb) => {
	axios
		.post(url, body, postConfig)
		.then(response => successCb(response.data))
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


const patchConfig = {
	header: {
		'Content-Type': 'application/json'
	}
}

export const patchData = (url, body, successCb) => {
	axios
		.patch(url, body, patchConfig)
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