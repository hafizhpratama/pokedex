import React, { useCallback, useMemo, useState } from 'react';
import { login } from '../services/authService';
import { LoginFormValues } from '../types/pokemon';
import { EMAIL_REGEX } from '../constants/loginConstants';

const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

const LoginPage: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValues: LoginFormValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === 'email') {
      setEmailError(!isValidEmail(value) ? 'Invalid email address' : null);
    }

    if (name === 'password') {
      const passwordValid =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value);
      setPasswordError(
        !passwordValid
          ? 'Password must be at least 8 characters long and include a number, an uppercase letter, a lowercase letter, and a special character'
          : null
      );
    }
  }, []);

  const isFormValid = useMemo(() => {
    return (
      !emailError &&
      !passwordError &&
      isValidEmail(formValues.email) &&
      !passwordError
    );
  }, [emailError, passwordError, formValues.email]);

  const handleLogin = useCallback(async () => {
    const { email, password } = formValues;

    if (!isValidEmail(email) || passwordError) {
      setError('Please fix the errors before submitting');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await login(email, password);
      setSuccess(true);
      console.log('Login successful:', data);
    } catch (err) {
      setSuccess(false);
      setError('Login failed. Please try again.');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  }, [formValues, passwordError]);

  const formComponent = useMemo(
    () => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            aria-label="Email"
            autoComplete="username"
            required
            className={`mt-1 w-full rounded-md border p-2 shadow-sm focus:outline-none focus:ring-2 ${
              emailError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          {emailError && (
            <p className="mt-2 text-sm text-red-500">{emailError}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            aria-label="Password"
            autoComplete="current-password"
            required
            className={`mt-1 w-full rounded-md border p-2 shadow-sm focus:outline-none focus:ring-2 ${
              passwordError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          {passwordError && (
            <p className="mt-2 text-sm text-red-500">{passwordError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="w-full rounded-md bg-red-500 py-2 text-white font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-200"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-4 border-t-4 border-red-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            'Login'
          )}{' '}
        </button>
        {error && <div className="text-center text-red-500">{error}</div>}{' '}
        {success && (
          <div className="text-center text-green-500">Login successful!</div>
        )}{' '}
      </form>
    ),
    [
      formValues,
      handleChange,
      handleLogin,
      loading,
      error,
      success,
      emailError,
      passwordError,
      isFormValid,
    ]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Login
        </h1>
        {formComponent}
      </div>
    </div>
  );
};

export default LoginPage;
