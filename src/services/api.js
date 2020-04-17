/***********************************************************************
 * File Name: api.js
 * Description: Defines API calls to the server to interact with data
 * hosted on the mongoDB servers. Note that operations must be exact 
 * for processes to be successful. Full CRUD functionality is implemented
 * through use of all four of the functions defined here.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import axios from "axios";
/**********************************************************************/

//Define the data as a JSON object for the server to receive.
const jsonConfig = {
	header: {
		'Content-Type': 'application/json'
	}
}

//Define the data as a JSON object for the server to receive.
const uploadConfig = {
	header: {
		'Content-Type': 'multipart/form-data'
	}
}

/**********************************************************************
 * Function Name: postData
 * Parameters:
 * 		- url: URI endpoint specification. This parameter assumes that 
 * 		       the url is correctly formed. An example of a correct url
 *             would be "http://localhost:2020/poetry/create". Please
 * 			   review server-side code to determine correct uri endpoint
 * 			   procedures.
 * 		- body: JSON object holding the data to create the new document
 * 				in the mongoDB. The name identifiers of each value must
 * 				correctly match the Model's definition. Otherwise, an error
 * 				will be thrown.
 * 		- successCB: callback function that is executed after a successful
 * 					 operation. The data is passed as a parameter in JSON 
 * 					 format.
 * 
 * Description: Api request for CREATE operation.
 * Notes: None
 **********************************************************************/
export const postData = (url, body, successCb, isUpload = false) => {
	axios
		.post(url, body, ((isUpload === false) ? jsonConfig : uploadConfig))
		.then(response => {
			successCb(response.data);
		})
		.catch(error => {
			console.log(error)
		})
}


/**********************************************************************
 * Function Name: getData
 * Parameters:
 * 		- url: URI endpoint specification. This parameter assumes that 
 * 		       the url is correctly formed. An example of a correct url
 *             would be "http://localhost:2020/poetry". Please
 * 			   review server-side code to determine correct uri endpoint
 * 			   procedures.
 * 		- successCB: callback function that is executed after a successful
 * 					 operation. The data is passed as a parameter in JSON 
 * 					 format.
 * 
 * Description: Api request for READ operation.
 * Notes: None
 **********************************************************************/
export const getData = (url, successCb) => {
	axios
		.get(url)
		.then(response => successCb(response.data))
		.catch(error => {
			console.error(error)
		})
}


/**********************************************************************
 * Function Name: putData
 * Parameters:
 * 		- url: URI endpoint specification. This parameter assumes that 
 * 		       the url is correctly formed. An example of a correct url
 *             would be "http://localhost:2020/poetry/:id/edit". Please
 * 			   review server-side code to determine correct uri endpoint
 * 			   procedures.
 * 		- body: JSON object holding the data to edit the document
 * 				in the mongoDB. The name identifiers of each value must
 * 				correctly match the Model's definition. Otherwise, an error
 * 				will be thrown.
 * 		- successCB: callback function that is executed after a successful
 * 					 operation. The data is passed as a parameter in JSON 
 * 					 format.
 * 
 * Description: Api request for UPDATE operation.
 * Notes: None
 **********************************************************************/
export const putData = (url, body, successCb) => {
	axios
		.put(url, body, jsonConfig)
		.then(response => successCb(response.data))
		.catch(error => {
			console.error(error)
		})
}


/**********************************************************************
 * Function Name: deleteData
 * Parameters:
 * 		- url: URI endpoint specification. This parameter assumes that 
 * 		       the url is correctly formed. An example of a correct url
 *             would be "http://localhost:2020/poetry/:id/delete". Please
 * 			   review server-side code to determine correct uri endpoint
 * 			   procedures.
 * 		- successCB: callback function that is executed after a successful
 * 					 operation. The data is passed as a parameter in JSON 
 * 					 format.
 * 
 * Description: Api request for DELETE operation.
 * Notes: None
 **********************************************************************/
export const deleteData = (url, successCb) => {
	axios
		.delete(url)
		.then(response => successCb(response.data))
		.catch(error => {
			console.error(error)
		})
}