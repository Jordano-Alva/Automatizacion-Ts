import { nodeProfilingIntegration } from "@sentry/profiling-node";
import * as Sentry from "@sentry/node";

//*PRUEBAS DE SENTRY 
//TODO: JALAR CON VARIABLES DE ENTORNO

Sentry.init({
  dsn: "https://294831f35b3820512130fc9b656b6390@o4507108968300544.ingest.us.sentry.io/4507348789886976",
  integrations: [
    nodeProfilingIntegration(),
  ],
  environment: 'Dev',
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

export { Sentry };