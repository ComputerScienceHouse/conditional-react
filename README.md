# Conditional Frontend

Frontend for Conditional, written in React with TypeScript.

## Local Development

To run this project locally, you are going to need to have `node` installed. With node installed, run `npm install` from within the project directory.

You will also need to provide environment variables in a `.env`, which you can get from an RTP.

Once you have all of that set up, you can run `npm start` to launch the site. This will auto update as you make changes.

In addition to the frontend, you will also need the backend running locally on port 8080. If the backend is not running, or is running on a port that isn't 8080, the site will error.

### Running Locally without SSO
If you want to develop locally without CSH auth, you can disable it by setting the `REACT_APP_SSO_ENABLED` field in the `.env` to `false`.
