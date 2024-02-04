import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.tsx.css'
import App from './App'
import { OidcProvider, OidcSecure, OidcConfiguration } from '@axa-fr/react-oidc'
import {SSOEnabled, cshOidcConfig, introOidcConfig} from './configuration'
import Authenticating from './callbacks/Authenticating'
import AuthenticationError from './callbacks/AuthenticationError'
import Loading from './callbacks/Loading'
import SessionLost from './callbacks/SessionLost'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
// handle security in here, and routing in app

root.render(
  <>
    {
      SSOEnabled ?
        <div>
        <button onClick={() => root.render(
    <OidcProvider
      configuration={cshOidcConfig}
      authenticatingComponent={Authenticating}
      authenticatingErrorComponent={AuthenticationError}
      loadingComponent={Loading}
      sessionLostComponent={SessionLost}
    >
      < OidcSecure >
        <App />
      </OidcSecure >
    </OidcProvider >
)}>CSH Auth</button>
        <button onClick={() => root.render(

    <OidcProvider
      configuration={introOidcConfig}
      authenticatingComponent={Authenticating}
      authenticatingErrorComponent={AuthenticationError}
      loadingComponent={Loading}
      sessionLostComponent={SessionLost}
    >
      < OidcSecure >
        <App />
      </OidcSecure >
    </OidcProvider >
        )}>Intro Auth</button>
        </div>
        : <App />
    }
  </>
)

