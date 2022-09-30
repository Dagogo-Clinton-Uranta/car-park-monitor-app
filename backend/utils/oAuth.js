import {google} from 'googleapis';

//this is an access token generator for google oAuth
 const oAuth75Client = new google.auth.OAuth2( process.env.GOOGLE_CLIENT_ID,  process.env.GOOGLE_CLIENT_SECRET, process.env.REDIRECT_URI)



export default oAuth75Client;