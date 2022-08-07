import axios from "axios";
import { errorDebug } from "./errorUtils";

export class HttpCall {

    _contentType = 'application/json; charset=UTF-8';

    get dataToSend() {
        return this._dataToSend;
    }

    get URL() {
        return this._URL;
    }

    set URL(url) {
        this._URL = url;
    }

    set setAuthToken(authToken) {
        this._authToken = authToken;
    }

    set setAuthRequired(authRequired) {
        this._isAuthRequired = authRequired;
    }

    set dataToSend(data) {
        this._dataToSend = data;
    }

    /**
     * @Function SEND_POST_REQUEST()
     * @Methods axios.POST()
     * @Returns An Object 
     */

    async sendPostRequest() {
        try {
            const response = await axios.post(
                this._URL,  // URL Passing
                this._dataToSend, // Data-Body Passing
                {
                    headers: {
                        'Content-Type': this._contentType,
                        'Authorization': this._isAuthRequired && this._authToken
                    }
                }
            )
            console.log("---------userapi.sendPostRequest-------", response)
            return {
                'statusCode': response.status,
                'responseBody': response.data
            }
        } catch (error) {
            return errorDebug(error.response.data, "httpCall.sendPostRequest()");
        }
    }

    /**
     * @Function SEND_GET_REQUEST()
     * @Methods axios.GET()
     * @Returns An Object 
     */

    async sendGetRequest() {
        try {
            const response = await axios.get(
                this._URL,
                {
                    headers: {
                        'Content-Type': this._contentType,
                        'Authorization': this._isAuthRequired && this._authToken
                    }
                }
            );
            return {
                'statusCode': response.status,
                'responseBody': response.data
            }
        } catch (error) {
            return errorDebug(error.response.data, "httpCall.sendGetRequest()");
        }
    }

    /**
     * @Function SEND_PUT_REQUEST()
     * @Methods axios.PUT()
     * @Returns An Object 
     */

    async sendPutRequest() {
        try {
            const response = await axios.put(
                this._URL,
                this._dataToSend,
                {
                    headers: {
                        'Content-Type': this._contentType,
                        'Authorization': this._isAuthRequired && this._authToken
                    }
                }
            )
            return {
                'statusCode': response.status,
                'responseBody': response.data
            }
        } catch (error) {
            return errorDebug(error.response.data, "httpCall.sendPutRequest()");
        }
    }


    //TODO:- Implementation
    async sendDeleteRequest() {

    }
}