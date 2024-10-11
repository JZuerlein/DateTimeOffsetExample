
export type TimeZoneContextType = {
    currentTimeZone: string;
    timeZones: string[];
    updateCurrentTimeZone: (newTimeZone: string) => void;
}