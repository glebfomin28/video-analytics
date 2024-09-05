type AnalyticZoneType = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type AnalyticTimestampType = {
  timestamp: number;
  duration: number;
  zone: AnalyticZoneType;
};
