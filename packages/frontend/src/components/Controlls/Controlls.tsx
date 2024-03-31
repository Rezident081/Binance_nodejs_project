import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import { controllsStyle } from "./controlls.styles";

import { Timeframe, Signals } from "../../utils/constants";

interface IControllsProps {
  isDisabled: boolean;
  isRealTime: boolean;
  handleChangeTimeframe: (timeframe: Timeframe) => void;
  handleRealTimeToggle: () => void;
  handleSignalClick: (signal: Signals) => void;
}

function Controlls({
  isDisabled,
  isRealTime,
  handleRealTimeToggle,
  handleChangeTimeframe,
  handleSignalClick,
}: IControllsProps) {
  return (
    <FormControl>
      <Stack spacing={2} direction="row" className={controllsStyle}>
        <Button
          variant="outlined"
          disabled={isDisabled}
          onClick={() => handleChangeTimeframe(Timeframe.FOUR_HOUR)}
        >
          4 hour
        </Button>
        <Button
          variant="outlined"
          disabled={isDisabled}
          onClick={() => handleChangeTimeframe(Timeframe.ONE_DAY)}
        >
          1 day
        </Button>
        <Button
          variant="outlined"
          disabled={isDisabled}
          onClick={() => handleChangeTimeframe(Timeframe.ONE_WEEK)}
        >
          1 week
        </Button>
        <Button
          variant="outlined"
          disabled={isDisabled}
          onClick={() => handleChangeTimeframe(Timeframe.ONE_MONTH)}
        >
          1 month
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={isDisabled}
          onClick={() => handleSignalClick(Signals.BUY)}
        >
          Buy signals
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={isDisabled}
          onClick={() => handleSignalClick(Signals.SELL)}
        >
          Sell signals
        </Button>
        <FormControlLabel
          value="end"
          control={<Switch color="primary" disabled={isDisabled} />}
          label={isRealTime ? "Enable real time" : "Disable real time"}
          labelPlacement="end"
          onChange={handleRealTimeToggle}
        />
      </Stack>
    </FormControl>
  );
}

export default Controlls;
