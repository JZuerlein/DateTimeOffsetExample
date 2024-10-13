import { Dayjs } from "dayjs";
import { useContext } from "react";
import { TimeZoneContextType } from "./TimeZoneContextType";
import { TimeZoneContext } from "./TimeZoneProvider";
import TimeZoneAutoSelectBox from "./TimeZoneAutoSelectBox";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Typography } from "@mui/material";

interface DateTimeOffsetControlProps {
    selectedDateTime: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void; // Define onChange with the expected type
}

function DateTimeOffsetControl({selectedDateTime, onChange} : DateTimeOffsetControlProps) {
    const { currentTimeZone } = useContext(TimeZoneContext) as TimeZoneContextType;
    //const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    return (
        <div>
            <TimeZoneAutoSelectBox/>
            <DateTimePicker
                timezone={currentTimeZone}
                label="Controlled picker"
                value={selectedDateTime}
                //onChange={newValue => {setValue(dayjs.tz(newValue));}}
                onChange={onChange}
                sx={{ mt: 2}}
                />
            <Typography sx={{ mt: 2 }}>
                Stored value: {selectedDateTime == null ? 'null' : selectedDateTime.format()}
            </Typography>
        </div>
    )
}

export default DateTimeOffsetControl;