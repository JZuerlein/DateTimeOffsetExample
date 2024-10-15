import dayjs, { Dayjs } from "dayjs";
import { useContext } from "react";
import { TimeZoneContextType } from "./TimeZoneContextType";
import { TimeZoneContext } from "./TimeZoneProvider";
import TimeZoneAutoSelectBox from "./TimeZoneAutoSelectBox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField, Typography } from "@mui/material";

interface DateTimeOffsetControlProps {
    selectedDateTime: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void; // Define onChange with the expected type
}

function DateTimeOffsetControl({selectedDateTime, onChange} : DateTimeOffsetControlProps) {
    const { currentTimeZone } = useContext(TimeZoneContext) as TimeZoneContextType;

    return (
        <div>
            <TimeZoneAutoSelectBox/>
            <DateTimePicker
                timezone={currentTimeZone}
                label=""
                value={selectedDateTime}
                onAccept={onChange}
                sx={{ mt: 2 }} 
                />
            <Typography sx={{ mt: 2 }}>
                Stored value: {selectedDateTime == null ? 'null' : dayjs(selectedDateTime).tz().format('YYYY-MM-DDTHH:mm:ssZ')}
            </Typography>
        </div>
    )
}

export default DateTimeOffsetControl;