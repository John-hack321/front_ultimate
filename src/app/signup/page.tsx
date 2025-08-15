'use client'
import { useRouter } from "next/navigation";
import { useState , useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SignUpFormValues , signInFormValues, signUpSchema } from "../schemas/auth";

import { useAuth } from "../context/authContext";

import { useForm } from 'react-hook-form';

export default function SignUpPage(){

    //debug log
    console.log(`the signup page has been rendered fully again`)

    // implementing foreing username input
    const [iHaveForeignChessAccount , setIHaveForeignChessAccount ] = useState(false)

    const [isLoading , setIsLoading] = useState(false);
    const [isFormValid , setIsFormValid] = useState(false);
    const [error , setError ] = useState<string | null>(null);
    const router = useRouter();

    const {signup} = useAuth();
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues : {
            username : "",
            chessDotComUsername : "",
            email : "",
            phone : "",
            password : "",
        },
        mode : "onChange",
    });

// this code down here is used to watch the email and the password fiedls , everytime the eamil or password feild changes the functoin inside useEffect is ran 
    const email = watch("email");
    const password = watch("password");
    const username = watch("username");
    const chessDotComUsername = watch("chessDotComUsername")
    const phone = watch("phone");

    useEffect(() => {
        // Form is valid if we have email, password, and at least one of username or chessDotComUsername
        console.log('form validation useEffect running')
        const hasUsername = Boolean(username && username.trim() !== '');
        const hasChessUsername = Boolean(chessDotComUsername && chessDotComUsername.trim() !== '');
        const hasEmail = Boolean(email && email.trim() !== '');
        const hasPassword = Boolean(password && password.trim() !== '');
        const hasPhone = Boolean(phone && phone.trim() !== '');

        const hasRequiredFields = hasEmail && hasPassword && hasPhone && (hasUsername || hasChessUsername);
        
        setIsFormValid(hasRequiredFields); // fix this typescript error here : to fix it we addeed teh boolean thing for the constants up there to prevent the error
    }, [email, password, username, chessDotComUsername, phone]); // update the dependancy array to fix the bugs

    const onSubmit = async (data: SignUpFormValues) => {
        try {
            console.log('Form submitted with data:', data);
            setIsLoading(true);
            await signup(
                data.email,
                data.phone,
                data.password,
                data.username || "",
                data.chessDotComUsername || "",
            );
            // Redirect to login or dashboard after successful signup
            // router.push('/login'); // redirecting i beleive is already handled signup function as it redirects to the dashboard
        } catch (error) {
            console.error("Error during signup:", error);
            setError(error instanceof Error ? error.message : 'An error occurred during signup');
        } finally {
            setIsLoading(false);
        }
    }

    // arrow function for handling the entering of the foreign username
    // NOTE : 
    //  React.MouseEvent<HTMLButtonElement> , this what it does is this : React.mouseevent is a generic type from react representing a mouse event like a click
    // <HTMLButtonElement> is a type parameter that specifies which HTML element the event is associated with
    // and they together mean a mouse event that occured on a button element in react

    const handleSwitchToForeign = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent form submission
        console.log('the chess.com username button has been clicked');
        if (iHaveForeignChessAccount === true) {
            setIHaveForeignChessAccount(false);
        }else {
            setIHaveForeignChessAccount(true);
        }
    }

{/*
    const onSubmit = async (data : SignUpFormValues) => {
        setIsLoading(true);
        setError(null);
        // const result = await signUp(data);
        await new Promise((resolve) => setTimeout(resolve , 1000))

    }
*/}

    return (
        <div className = 'flex min-h-screen w-full bg-white'>
            <div className = 'relative w-full lg:w-1/2 '>
            <div className = 'absolute left-8 top-6  p-2 '>
                <span className = 'text-xl font-bold tracking-tight text-black lowercase'>.COD_WARS</span>
            </div>  
            {/*sing up form */}
            <div className = "flex min-h-screen items-center justify-center">
                <div className = "w-full max-w-md p-8">
                    <h2 className = "mb-6 text-center text-2xl font-semibold text-black ">Create your account?</h2>
                    {error && (
                        <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded-md">
                            {error}
                        </div>
                    )}
                    <form onSubmit = {handleSubmit(onSubmit)}>
                        <div className = "mb-4">
                            {/* this button will be used to conditionaly render the username input field based on whether the chess.com username is available or not */}
                            <button 
                                type="button" // Add type="button" to prevent form submission ( the typ button is added to prevene the button from submitting the form)
                                className="text-black p-2 rounded-lg bg-gray-200 border border-gray-600 mb-2"
                                onClick={handleSwitchToForeign}
                            >
                                {iHaveForeignChessAccount ? "I don't have a chess.com account" : "Sign up using chess.com account"}
                            </button>
                            <label htmlFor="username" className = "mb-1 block text-sm font-medium text-black">
                                Username
                            </label>
                            {  // if a user has a foreing account ask for foreing username , if not ask for new username
                            iHaveForeignChessAccount ? (
                                <div>
                                    <input type="chessDotComUsername"
                                    id = "chessDotComUsername"
                                    {...register('chessDotComUsername')}
                                    placeholder="enter your chess.com username"
                                    className = "text-black p-2 rounded-lg w-full border border-gray-600 focus:ring-1 focus:ring-black focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                                    />
                                    {errors.chessDotComUsername && (
                                        <p className = "text-xs text-red-500 mt-1">{errors.chessDotComUsername.message}</p>
                                    )}
                                </div>
                        ) : (<div>
                                    <input type="username" 
                                id="username"
                                {...register("username")}
                                placeholder="enter your username"
                                className = "text-black p-2 rounded-lg w-full  border border-gray-600 focus:ring-1 focus:ring-black focus:outline-none placeholder:text-gray-600  placeholder:text-sm "
                                />
                                {errors.username && (
                                    <p className = "text-xs mt-1 text-red-500">{errors.username.message}</p>
                                )}
                                </div>   
                            )}
                        </div>
                        <div className = "mb-4">
                            <label htmlFor="email" className = 'mb-1 block text-sm  font-medium text-black'>
                                Email
                            </label>
                            <input 
                            type="email"
                             id = "email"
                             {...register("email")}
                             placeholder="enter your email address"
                             className = "w-full text-black rounded-lg border border-gray-600 p-2 placeholder:text-sm placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-black focus:ring-1"  />
                             {errors.email && (
                                <p className = "text-xs mt-1 text-red-500">
                                    {errors.email.message}
                                </p>
                             )}                        </div>

                        <div className = "mb-4">
                            <label htmlFor="phone" className = "mb-1 block text-sm font-medium text-black">
                                Phone
                            </label>
                            <input type="tel"
                            id = "phone"
                            {...register("phone")}
                            placeholder="enter your phone number"
                            className = "text-black focus:ring-black focus:ring-1 border-gray-600 placeholder:text-gray-500 placeholder:text-xs border w-full p-2 rounded-lg focus:outline-none"/>
                            {errors.phone && (
                                <p className = "text-xs text-red-500 mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        <div className = 'mb-4 '>
                            <label htmlFor="password" className = 'mb-1 block text-sm font-medium text-black'>
                                Password
                            </label>
                            <input type="password" 
                            id = "password" 
                            {...register("password")}
                            placeholder="enter your password"
                            className = " w-full text-black focus:border-black focus:ring-1 focus:ring-black placeholder:text-sm placeholder:text-gray-500 p-2 focus:outline-none border-gray-500 border rounded-lg" />
                            {errors.password && (
                                <p className = "mt-1 text-xs text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <button 
                        type = "submit"
                        disabled = {isLoading || !isFormValid}
                        className = {`my-4 w-full   rounded-full py-2.5 text-sm text-black bg-transparent border border-black font-bold text-center p-2 transition-colors ${isLoading ? "cursor-not-allowed bg-gray-400" : isFormValid ? "bg-black" : "bg-gray-400 cursor-not-allowed"} `}
                        >{isLoading ? (<span className = "flex justify-center  items-center">
                             <svg
        className="animate-spin h-5 w-5 mr-2 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 "
        ></path>
      </svg>
      Creating account...
                        </span>) :
                        ("signup") }
                        </button>
                        <div className = "text-center">
                            <span className = "text-gray-700 text-sm">already have an account
                                <a href="/login" className = "ml-2 underline text-blue">Sign in</a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            </div>
            {/* the right side of the sign up page  */}
            <div className = "hidden py-[3vh] pr-[3vh] lg:block lg:w-1/2">
            <div className = "hidden h-full rounded-3xl bg-gradient-to-b from-indigo-100 via-purple-100 to-[#5960d7] lg:block ">
                <div className = 'flex h-full flex-col p-12 '>
                    <div className = "flex h-full items-center justify-center">
                        <Image 
                          src="/cod_actual.png" 
                          alt="Chess game illustration" 
                          width={500} 
                          height={500}
                          className="rounded-lg hover:opacity-100"
                          priority
                        />
                        </div>
                        <div className = "w-full max-w-lg h-fit  p-2">
                            <div className = "mb-3 flex bg-indigo-100 w-fit rounded-2xl bg-opacity-40 px-3 py-1 ">
                                <span className = "uppercase tracking-wider text-purple-950 text-xs font-medium" >latest updates</span>
                            </div>
                            <h3 className = "xl:text-xl text-white text-lg 2xl:text-2xl 2xl:leading-10"> go to the tournaments sections and play completely anonymous tournaments with strangers from all over the world </h3>
                        </div>
                </div>
            </div>
            </div>
        </div>
    ) 
}


// so i guess we are going to follow copilot's advise where we will only do the thing in a way such that we follow the common patterns 
// if we encounter a difficult we use ai : and we will be done soon 
