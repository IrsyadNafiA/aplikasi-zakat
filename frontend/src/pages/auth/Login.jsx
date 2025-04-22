import { AppProvider, SignInPage } from "@toolpad/core";

const providers = [{ id: "nodemailer", name: "Email" }];

const signIn = async (provider) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      // preview-start
      resolve({
        success: "Check your email for a verification link.",
      });
      // preview-end
    }, 500);
  });
  return promise;
};

const Login = () => {
  return (
    // preview-start
    <AppProvider>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
    // preview-end
  );
};

export default Login;
