interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const validateSignup = ({ name, email, password }: SignupInput) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
};

export const validateLogin = ({ email, password }: LoginInput) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};
