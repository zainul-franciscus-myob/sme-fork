import TelemetryType from './TelemetryType';
import initializeHttpTelemetry from './initializeHttpTelemetry';
import initializeNoOpTelemetry from './initializeNoOpTelemetry';

let telemetry = {};

class BadTelemetryTypeError extends Error {
  constructor(telemetryType) {
    super(`"${telemetryType}" is not a valid telemetry type`);
    this.telemetryType = telemetryType;
  }
}

const getInitializer = (telemetryType) => {
  switch (telemetryType) {
    case TelemetryType.Http:
      return initializeHttpTelemetry;
    case TelemetryType.NoOp:
      return initializeNoOpTelemetry;
    default:
      throw new BadTelemetryTypeError(telemetryType);
  }
};

export const initializeTelemetry = (telemetryType, getTelemetryInfo) => {
  const initializer = getInitializer(telemetryType);
  telemetry = initializer(getTelemetryInfo);
};

export const recordPageVisit = (props) => telemetry.recordPageVisit(props);
export const trackUserEvent = (props) => telemetry.trackUserEvent(props);
