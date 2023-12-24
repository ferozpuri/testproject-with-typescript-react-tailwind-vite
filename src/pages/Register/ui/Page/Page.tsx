import {FC} from "react";

import {useForm, SubmitHandler} from 'react-hook-form';

// Defining interface for form values
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  bio: string;
  gender: string;
  agreeTerms: boolean;
}

const Register: FC = () => {
  // Destructuring methods from useForm hook
  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission
    console.log(" Validation Passed:", data);
  };

  return (
    <>
      <section>
        <div className="pt-8 pb-8 bg-base-200">

          <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label htmlFor="username"
                     className={`${getErrorClasses(errors.username?.message, false)} block mb-2 text-sm font-medium text-gray-900 dark:text-white `}>Your
                Username</label>
              <input type="text" id="username"
                     {...register('username', {
                       required: 'Username is required',
                       pattern: {
                         value: /^[a-zA-Z0-9_]{3,15}$/,
                         message: 'Invalid username format',
                       },
                     })}
                     className={`${getErrorClasses(errors.username?.message)} shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                     placeholder="username"/>
              {ShowError(errors.username?.message)}
            </div>
            <div className="mb-5">
              <label htmlFor="email"
                     className={`${getErrorClasses(errors.email?.message, false)} block mb-2 text-sm font-medium text-gray-900 dark:text-white `}>Your
                email</label>
              <input type="text" id="email"
                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                     {...register('email', {
                       required: 'Email is required',
                       pattern: {
                         value: /\S+@\S+\.\S+/,
                         message: 'Invalid email address',
                       },
                     })}
                     placeholder="name@flowbite.com"/>
              {ShowError(errors.username?.message)}
            </div>

            <div className="mb-5">
              <label htmlFor="dob"
                     className={`${getErrorClasses(errors.dob?.message, false)} block mb-2 text-sm font-medium text-gray-900 dark:text-white `}>Your
                Date of Birth</label>
              <input type="date" id="dob"
                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                     {...register('dob', {
                       required: 'Date of Birth is required',
                       validate: (value) => isAdult(value) || 'You must be at least 18 years old',
                     })}/>
              {ShowError(errors.dob?.message)}
            </div>
            <div className="mb-5">
              <label htmlFor="password"
                     className={`${getErrorClasses(errors.password?.message, false)} block mb-2 text-sm font-medium text-gray-900 dark:text-white `}>Your
                password</label>
              <input type="password" id="password"
                     {...register('password', {
                       required: 'Password is required',
                       minLength: {
                         value: 8,
                         message: 'Password must be at least 8 characters',
                       },
                       pattern: {
                         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                         message: 'Password must include uppercase, lowercase, number, and special character',
                       },
                     })}
                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              {ShowError(errors.password?.message)}
            </div>
            <div className="mb-5">
              <label htmlFor="repeat-password"
                     className={`${getErrorClasses(errors.confirmPassword?.message, false)} block mb-2 text-sm font-medium text-gray-900 dark:text-white `}>Repeat
                password</label>
              <input type="password" id="repeat-password"
                     {...register('confirmPassword', {
                       required: 'Confirm Password is required',
                       validate: (value) => value === getValues('password') || 'Passwords do not match',
                     })}
                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              {ShowError(errors.confirmPassword?.message)}
            </div>

            <div className="mb-5">
              <label htmlFor="bio"
                     className={`${getErrorClasses(errors.bio?.message, false)} block mb-2 text-sm font-medium text-gray-900 dark:text-white `}>Your
                Bio Summary</label>
              <textarea id="bio"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Add your bio summary"
                        {...register('bio', {maxLength: 300})}/>
              {ShowError(errors.bio?.message)}
            </div>
            <div className="mb-5">
              <fieldset>
                <legend className="sr-only">Gender</legend>
                <label htmlFor="gender"
                       className={`${getErrorClasses(errors.gender?.message, false)} block mb-2 text-sm font-medium text-gray-900 dark:text-white `}>Gender</label>

                <div className="flex items-center mb-4">
                  <input id="gender-option-1" type="radio" value="Male"
                         className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                         {...register('gender', {required: 'Gender is required'})} />
                  <label htmlFor="gender-option-1"
                         className={`${getErrorClasses(errors.gender?.message, false)} block text-sm font-medium text-gray-900 ms-2 dark:text-gray-300`}>
                    Male
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input id="gender-option-2" type="radio" value="Female"
                         className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" {...register('gender', {required: 'Gender is required'})} />
                  <label htmlFor="gender-option-2"
                         className={`${getErrorClasses(errors.gender?.message, false)} block text-sm font-medium text-gray-900 ms-2 dark:text-gray-300`}>
                    Female
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input id="gender-option-3" type="radio" value="Other"
                         className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" {...register('gender', {required: 'Gender is required'})}/>
                  <label htmlFor="gender-option-3"
                         className={`${getErrorClasses(errors.gender?.message, false)} block text-sm font-medium text-gray-900 ms-2 dark:text-gray-300`}>
                    Other
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="mb-5">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" type="checkbox" value=""
                         {...register('agreeTerms', {required: 'You must agree to the Terms and Conditions'})}
                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"/>

                </div>
                <label htmlFor="terms"
                       className={`${getErrorClasses(errors.agreeTerms?.message, false)} text-sm font-medium text-gray-900 ms-2 dark:text-gray-300`}>I
                  agree with
                  the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and
                    conditions</a></label>
              </div>
              {ShowError(errors.agreeTerms?.message)}
            </div>
            <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
              new account
            </button>
          </form>


        </div>
      </section>
    </>
  );
};

export default Register;

// A pure helper function: that shows error message if field is invalid
const ShowError = (errorMsg: string | undefined) => {
  return errorMsg ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span
    className="font-medium">Oops!</span> {errorMsg}</p>) : null
}

// A pure helper function that returns the appropriate classes for our input fields
const getErrorClasses = (errorMsg: string | undefined, isField = true): string => errorMsg ? !isField ? 'text-red-700 dark:text-red-500' : ' bg-red-50 border border-red-500 text-red-900 placeholder-red-700 dark:bg-green-100 dark:border-green-400' : '';

// A pure helper function that checks if user is at least 18 years old
function isAdult(date: string) {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age > 18) return true;
  if (age === 18) {
    return today.getMonth() >= birthDate.getMonth() && today.getDate() >= birthDate.getDate();
  }

  return false;
}
