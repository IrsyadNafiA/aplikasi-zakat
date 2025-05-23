import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import EachUtils from "../utils/eachUtils";

const RHFTextField = ({
  name,
  label,
  type = "text",
  variant = "standard",
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <TextField
      id={name}
      fullWidth
      variant={variant}
      type={type}
      label={label}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
      {...props}
    />
  );
};

const RHFPasswordField = ({ name, label, variant = "standard", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ width: "100%" }} variant={variant} error={!!error}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Input
        id={label}
        type={showPassword ? "text" : "password"}
        {...register(name)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...props}
      />
      {error && (
        <Typography variant="caption" color="error">
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
};

const RHFSelectField = ({
  name,
  label,
  variant = "standard",
  options,
  onChange: customOnChange,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <FormControl variant={variant} fullWidth error={!!error}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            labelId={`${name}-label`}
            id={name}
            label={label}
            {...field}
            onChange={(e) => {
              field.onChange(e); // biar React Hook Form update value-nya
              if (customOnChange) {
                customOnChange(e.target.value); // biar kamu juga bisa pakai value-nya
              }
            }}
            {...props}
          >
            {options.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && (
        <Typography variant="caption" color="error">
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
};

export { RHFTextField, RHFPasswordField, RHFSelectField };
