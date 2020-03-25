import axios from "axios";

const postConfig = {
	header: {
		'Content-Type': 'application/json'
	}
}

export const postData = (url, body, successCb, errorCb) => {
	axios
		.post(url, body, postConfig)
		.then(response => successCb(response.data))
		.catch(error => {
			if (errorCb) errorCb(error)
		})
}


export const getData = (url, successCb, errorCb) => {
	axios
		.get(url)
		.then(response => successCb(response.data))
		.catch(error => {
			console.error(error)
			if (errorCb) errorCb(error)
		})
}


const patchConfig = {
	header: {
		'Content-Type': 'application/json'
	}
}

export const patchData = (url, body, successCb, errorCb) => {
	axios
		.patch(url, body, patchConfig)
		.then(response => successCb(response.data))
		.catch(error => {
			console.error(error)
			if (errorCb) errorCb(error)
		})
}


export const deleteRequest = (url, successCb, errorCb) => {
	axios
		.delete(url)
		.then(response => successCb(response.data))
		.catch(error => {
			console.error(error)
			if (errorCb) errorCb(error)
		})
}