"use client"

import { Loader, CloudUpload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

const linkedInRegex = /^https:\/\/www\.linkedin\.com\/in\/[A-z0-9_-]+\/?$/;
const githubRegex = /^https:\/\/github\.com\/[A-z0-9_-]+\/?$/;
const PhoneNumberRegex = /^(\+91)?[6789]\d{9}$/;
const imageFileSchema = z.custom((file) => {
    if (!(file instanceof File)) {
        return false;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    return validTypes.includes(file.type);
}, {
    message: "Invalid file type. Only jpg, png, or jpeg files are allowed."
});

const schema = z.object({
    name: z.string().min(1, { message: "Please enter your name" }),
    contact: z.string().regex(PhoneNumberRegex, { message: "Invalid Indian contact number" }),
    linkedin: z.string().url().regex(linkedInRegex, { message: "Invalid LinkedIn profile URL" }),
    company: z.string(),
    position: z.string(),
    role: z.string(),
    bio: z.string().min(10, { message: "Bio must be at least 10 characters long" }).max(300, { message: "Bio must be at most 300 characters long" }),
    rollno: z.string().min(1, { message: "Please enter your Roll No." }),
    email: z.string().email({ message: "Invalid email address" }),
    github: z.string().url().regex(githubRegex, { message: "Invalid GitHub profile URL" }),
    othersocial: z.string(),
    ctc: z.preprocess(
        (val) => (val !== undefined && val !== null && val !== "" ? Number(val) : undefined),
        z.number().positive({ message: "CTC must be a positive number" }).optional()
    ),
    experience: z.string(),
    level:z.enum(['easy', 'medium', 'hard'],{message:"Please select the level of your experience"}),
    confirm: z.boolean().refine(value => value === true, { message: "Please confirm that all information provided is accurate" }),
});




export default function Form1() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);



    const onSubmit = async (data) => {
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if ((file1 && !validTypes.includes(file1.type)) || (file2 && !validTypes.includes(file2.type))) {
            toast.error('Invalid file type. Only jpg, png, or jpeg files are allowed.');
            return;
        }

        const formData = new FormData();
        formData.append('file1', file1);
        formData.append('file2', file2);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/upload`, {
            method: 'POST',
            body: formData,
        });

        const tmp = await res.json();

        if (!res.ok) {
            toast.error('An error occurred while uploading the image. Please try again later.');
        }
        const { profilepic, logo } = tmp;
        const { confirm, ...rest } = data;
        const actualData = { ...rest, profilepic, logo };
        console.log(actualData)
        // await new Promise((resolve) => setTimeout(resolve, 4000));
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actualData)
        });
        const response = await res2.json();
        if (!res2.ok) {
            toast.error('An error occurred while submitting the form. Please try again later.');
            return;
        }
        toast.success('Form submitted successfully! Thank you for sharing', {
            duration: 5000,
        })
    }


    return (
        <div className="bg-[#292929] w-full">
            <div className="flex flex-col justify-center items-center py-32  mx-auto max-w-[110rem]">

                <div className=" w-[95%] xl:w-[73%] rounded-lg  shadow shadow-blue-300">

                    <div className="">
                        <form className="lg:w-full px-5  " onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className="md:w-[96%] mx-auto pb-10">

                                    <p className="text-center lg:text-left font-bold pt-20 text-5xl"><span>Your</span> <span className="bg-gradient-to-r from-blue-400 via-blue-100 to-amber-100 bg-clip-text text-transparent">Experience</span> <span>Matters</span></p>
                                </div>
                                <div className=" md:w-[90%] mx-auto flex justify-around md:flex-row flex-col md:gap-10 lg:px-5">
                                    <div className="w-full">
                                        {formFields.slice(0, 7).map((field, index) => (
                                            <div key={index} >
                                                <div className="flex flex-col  mt-10 w-full justify-center items-center mx-auto">
                                                    <label className="text-lg self-start font-geist text-white">{field.label}</label>
                                                    <input
                                                        className={field.height ? (`align-text-top h-64 mt-2 w-full px-2 rounded-lg self-center bg-[#323232] focus:placeholder-blue-400 focus:outline-none border-gray-500 `) : (` focus:outline-none h-14 mt-2 w-full px-2 rounded-lg self-center bg-[#323232] focus:placeholder-blue-400 border-b border-gray-500`)}
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        {...register(field.name)}
                                                    />
                                                </div>
                                                {errors[field.name] && <p className="text-red-500 text-md">{errors[field.name].message}</p>}
                                            </div>
                                        ))}
                                        <div className="hidden md:block">
                                            {/* <Formbutton /> */}
                                            <div>
                                                <label className="flex  justify-center items-center text-center w-full bg-[#323232] h-16 rounded-md mt-10"><CloudUpload className="mx-2" />Please Upload Your Picture <input accept=".png,.jpg,.jpeg" id="file1" onChange={(e) => setFile1(e.target.files[0])} type="file" className="opacity-0 absolute w-full" /></label>
                                                <label className=" flex justify-center items-center text-center w-full bg-[#323232] h-16 rounded-md mt-8"><CloudUpload className="mx-2" />Please Upload Your Company Logo<input accept=".png,.jpg,.jpeg" id="file2" onChange={(e) => setFile2(e.target.files[0])} type="file" className="opacity-0 absolute w-full" /></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        {formFields.slice(7, formFields.length).map((field, index) => (
                                            <div key={index} >
                                                <div className="flex flex-col  mt-10 w-full justify-center items-center mx-auto">
                                                    <label className="text-lg self-start font-geist text-white">{field.label}</label>
                                                    <input
                                                        className={field.height ? (`align-text-top h-64 mt-2 w-full px-2 rounded-lg self-center bg-[#323232] focus:placeholder-blue-400 focus:outline-none border-b border-gray-500`) : (` focus:outline-none h-14 mt-2 w-full px-2 rounded-lg self-center bg-[#323232] focus:placeholder-blue-400 border-b border-gray-500`)}
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        {...register(field.name)}
                                                    />
                                                </div>
                                                {errors[field.name] && <p className="text-red-500 text-md">{errors[field.name].message}</p>}
                                            </div>
                                        ))}
                                        
                                        <p className='text-white text-lg pt-10'>Your Experience</p>
                                        <select name="level" {...register("level")} className="bg-[#323232] text-[#A8A8A8] flex  justify-center items-center  w-full h-16 rounded-md mt-3 px-3 text-lg" >
                                            <option value="" selected disabled hidden>Select Level of Your Experience</option>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                        {errors.level && <p className="text-red-500 text-md">{errors.level.message}</p>}
                                        

                                        <div className="md:hidden block">
                                            {/* <Formbutton /> */}
                                            <div>
                                                <label className="flex  justify-center items-center text-center w-full bg-[#323232] h-16 rounded-md mt-10"><CloudUpload className="mx-2" />Please Upload Your Picture <input accept=".png,.jpg,.jpeg" id="file1" onChange={(e) => setFile1(e.target.files[0])} type="file" className="opacity-0 absolute w-full" /></label>
                                                <label className=" flex justify-center items-center text-center w-full bg-[#323232] h-16 rounded-md mt-8"><CloudUpload className="mx-2" />Please Upload Your Company Logo<input accept=".png,.jpg,.jpeg" id="file2" onChange={(e) => setFile2(e.target.files[0])} type="file" className="opacity-0 absolute w-full" /></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[86%] mx-auto">
                                    <div className="flex  items-center pt-10">
                                        <input {...register("confirm")} type="checkbox" id="concent_btn" className="w-5 cursor-pointer h-12 bg-black" />
                                        <label htmlFor="concent_btn" className="cursor-pointer text-md text-[#AFAFAF] pl-4">I hereby confirm that all information provided by me is accurate.</label>
                                    </div>
                                    {errors.confirm && <p className="text-red-500 text-lg">{errors.confirm.message}</p>}

                                    <button disabled={isSubmitting} className="flex justify-center text-black text-3xl mb-20 font-semibold items-center text-center w-full bg-[#FAD869] h-16 rounded-md mt-8">
                                        {isSubmitting ? <div className="flex justify-center items-center bg-[#a18837] h-full w-full text-black"> <Loader className="animate-spin text-black mx-2 " color="#000000" size={28} />Please Wait</div> : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


// function Formbutton() {
//     return (
//         <div>
//             <button className="flex  justify-center items-center text-center w-full bg-[#323232] h-16 rounded-md mt-10"><CloudUpload className="mx-2" />Please Upload Your Picture <input accept=".png,.jpg,.jpeg" id="file1" onChange={(e) => setFile1(e.target.files[0])} type="file" className="opacity-0 absolute w-full" /></button>
//             <button className=" flex justify-center items-center text-center w-full bg-[#323232] h-16 rounded-md mt-8"><CloudUpload className="mx-2" />Please Upload Your Company Logo<input accept=".png,.jpg,.jpeg" id="file2" onChange={(e) => setFile2(e.target.files[0])} type="file" className="opacity-0 absolute w-full" /></button>
//         </div>
//     )
// }


// Form fields are defined here
const formFields = [
    {
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "Enter your name",
    },
    {
        label: "Contact",
        name: "contact",
        type: "number",
        placeholder: "Enter your Contact No.",
    },
    {
        label: "Linkedin Profile",
        name: "linkedin",
        type: "text",
        placeholder: "Please provide your Profile URL",
    },
    {
        label: "Name of your Company",
        name: "company",
        type: "text",
        placeholder: "Enter Your Company Name",
    },
    {
        label: "Position",
        name: "position",
        type: "text",
        placeholder: "Select Your Position",
    },
    {
        label: "Type of Role",
        name: "role",
        type: "text",
        placeholder: "Select Your Role",
    },
    {
        label: "Please add Your Short Bio",
        name: "bio",
        type: "text",
        height: "64",
        placeholder: "Type your Bio Here",
    },
    {
        label: "Roll No.",
        name: "rollno",
        type: "text",
        placeholder: "Enter your Roll No.",
    },
    {
        label: "Email Id",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
    },
    {
        label: "GitHub Link",
        name: "github",
        type: "text",
        placeholder: "Please provide your Profile URL",
    },
    {
        label: "Other Social Site (If any)",
        name: "othersocial",
        type: "text",
        placeholder: "Please provide your Profile URL",
    },
    {
        label: "What is Your CTC",
        name: "ctc",
        type: "number",
        placeholder: "Enter Your CTC in LPA",
    },
    {
        label: "Please add Your Experience",
        name: "experience",
        type: "text",
        height: "64",
        placeholder: "Type your Experience Here",
    },
];