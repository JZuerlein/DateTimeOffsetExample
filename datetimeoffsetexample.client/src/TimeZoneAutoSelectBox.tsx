import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { TimeZoneContext } from "./TimeZoneProvider";
import { TimeZoneContextType } from "./TimeZoneContextType";
import PublicIcon from '@mui/icons-material/Public';


export default function TimeZoneAutoSelectBox() {

    const { currentTimeZone, timeZones, updateCurrentTimeZone } = React.useContext(TimeZoneContext) as TimeZoneContextType;
    const [ displaySelectBox, setDisplaySelectBox ] = useState<Boolean>(false);

    const displayTimeZoneList = (event: React.MouseEvent) => {
        event?.preventDefault();
        setDisplaySelectBox(true);
    }
    
    return (
        <div>
        {displaySelectBox ? (
            <Autocomplete
                options={timeZones?.map(_ => ({ id: _, label: _ })) || []} // Options for the Autocomplete
                value={({id: currentTimeZone, label: currentTimeZone})} // Ensure a controlled input
                onChange={(event, newValue) => {
                    if (newValue?.id != null || newValue?.id != undefined) {
                        updateCurrentTimeZone(newValue?.id);
                        setDisplaySelectBox(false);
                    }
                }}
                size="small"
                renderInput={(inputParams) => (
                <TextField
                    {...inputParams}
                    style={{ }} // Adjust the width to match the cell
                />
            )}
            sx={{ width: 300 }}
        />
        ) : (
            <Button onClick={displayTimeZoneList}><PublicIcon sx={{ mr:1}}/>{currentTimeZone}</Button>
        )}
          </div> 
    );
}