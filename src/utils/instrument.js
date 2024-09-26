require("dotenv").config({ path: [".env.development.local", ".env"] });
const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  // Tracing
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
