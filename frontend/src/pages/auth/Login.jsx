import { Button } from "@mui/material";
import { AppProvider, SignInPage } from "@toolpad/core";

const providers = [{ id: "credentials", name: "Email and Password" }];

const signIn = async (provider, formData) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      const email = formData?.get("email");
      const password = formData?.get("password");
      alert(
        `Signing in with "${provider.name}" and credentials: ${email}, ${password}`
      );
      // preview-start
      resolve({
        type: "CredentialsSignin",
        error: "Invalid credentials.",
      });
      // preview-end
    }, 300);
  });
  return promise;
};

const customButton = () => {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="medium"
      disableElevation
      fullWidth
    >
      Log In
    </Button>
  );
};

const Login = () => {
  return (
    // preview-start
    <AppProvider>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { variant: "standard", autoFocus: false },
          passwordField: { variant: "standard" },
        }}
        slots={{
          submitButton: customButton,
        }}
      />
    </AppProvider>
    // preview-end
  );
};

export default Login;
