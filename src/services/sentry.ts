import { nodeProfilingIntegration } from "@sentry/profiling-node";
import * as Sentry from "@sentry/node";
import { variablesEntorno } from "../config/env";

//*PRUEBAS DE SENTRY 
//TODO: JALAR CON VARIABLES DE ENTORNO

const { DSN_SENTRY, DSN_ENVIROMENT } = variablesEntorno

Sentry.init({
  dsn: DSN_SENTRY,
  integrations: [
    nodeProfilingIntegration(),
  ],
  environment: DSN_ENVIROMENT,
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

export { Sentry };