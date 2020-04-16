import TelemetryType from './TelemetryType';
import initializeHttpTelemetry from './initializeHttpTelemetry';
import initializeNoOpTelemetry from './initializeNoOpTelemetry';

class BadTelemetryTypeError extends Error {
  constructor(telemetryType) {
    super(`"${telemetryType}" is not a valid telemetry type`);
    this.telemetryType = telemetryType;
  }
}

const getInitializeTelemetry = (telemetryType) => {
  switch (telemetryType) {
    case TelemetryType.Http:
      return initializeHttpTelemetry;
    case TelemetryType.NoOp:
      return initializeNoOpTelemetry;
    default:
      throw new BadTelemetryTypeError(telemetryType);
  }
};

export default getInitializeTelemetry;
