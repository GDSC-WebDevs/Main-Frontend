"use client"

import Image from "next/image";
import { Loader, CloudUpload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";


const PhoneNumberRegex = /^(\+91)?[6789]\d{9}$/;

const schema = z.object({
    name: z.string().min(1, { message: "Please enter your name" }),
    contact: z.string().regex(PhoneNumberRegex, { message: "Invalid Indian contact number" }).optional(),
    rollno: z.string().min(1, { message: "Please enter your Roll No." }),
    email: z.string().email({ message: "Invalid email address" }),
    confirm: z.boolean().refine(value => value === true, { message: "Please confirm that all information provided is accurate" }),
});




export default function Form2() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
    const [file, setFile] = useState(null);


    const onSubmit = async (data) => {
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!file) {
            toast.error('Please upload a payment reciept.');
            return;
        }
        if (file && !validTypes.includes(file.type)) {
            toast.error('Invalid file type. Only jpg, png, or svg files are allowed.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/registation/upload`, {
            method: 'POST',
            body: formData,
        });

        const tmp = await res.json();

        if (!res.ok) {
            toast.error('An error occurred while uploading the image. Please try again later.');
        }
        const { paymentRecipt } = tmp;
        const { confirm, ...rest } = data;
        const rem_data = { ...rest, paymentRecipt };

        const res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/registation/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rem_data)
        });
        if (!res2.ok) {
            toast.error('An error occurred while submitting the form. Please try again later.');
            return;
        }
        toast.success('Form submitted successfully! Thank you for registering', {
            duration: 5000,
        })
    }


    return (
        <div className="bg-[#292929] w-full">
            <div className="flex flex-col justify-center items-center py-32  mx-auto max-w-[110rem]">

                <div className="lg:w-[50%] w-[90%] rounded-lg  shadow shadow-blue-300">
                    <p className="text-center font-bold pt-20 text-5xl"><span>Register</span> <span className="bg-gradient-to-r from-blue-400 via-blue-100 to-amber-100 bg-clip-text text-transparent">Here</span> </p>

                    <div className="lg:w-[75%] w-[85%] mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {formFields.map((field, index) => (
                                <div key={index} >
                                    <div className="flex flex-col  mt-10 w-full justify-center items-center mx-auto">
                                        <label className="text-lg self-start font-geist text-white">{field.label}</label>
                                        <input
                                            className={field.height ? (`align-text-top h-64 mt-2 w-full px-2 rounded-lg self-center bg-[#323232] focus:placeholder-blue-400 focus:outline-none `) : (` focus:outline-none h-14 mt-2 w-full px-2 rounded-lg self-center bg-[#323232] focus:placeholder-blue-400`)}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            {...register(field.name)}
                                        />
                                    </div>
                                    {errors[field.name] && <p className="text-red-500 text-md">{errors[field.name].message}</p>}
                                </div>
                            ))}


                            <button className="flex justify-center items-center text-center w-full bg-[#323232] h-58 rounded-md mt-10"><Image src="ORcode.svg" width={238} height={238} className="mx-2" alt="image"></Image></button>

                            <label className="flex  justify-center items-center text-center w-full bg-[#323232] h-16 rounded-md mt-10"><CloudUpload className="mx-2" />Please Upload Your Payment Reciept <input accept=".png,.jpg,.jpeg" id="file1" onChange={(e) => setFile(e.target.files[0])} type="file" className="opacity-0 absolute w-full" /></label>
                            <label
                                htmlFor="fileInput"
                                className=" flex justify-end cursor-pointer"

                            >
                                {file && <p className=' bg-[#323232] max-w-60 text-blue-400 truncate  px-3 py-1 mt-3  rounded-md  text-md'>{file.name}</p>}

                            </label>


                            <div className="flex justify-center items-center pt-10">
                                <input id="confirm_btn" type="checkbox" className="w-5 h-12 bg-black" {...register("confirm")} />
                                <label htmlFor="confirm_btn" className=" text-md text-[#AFAFAF] pl-4">I hereby confirm that all information provided by me is accurate.</label>
                            </div>
                            {errors.confirm && <p className="text-red-500 text-md pl-8">{errors.confirm.message}</p>}
                            <button disabled={isSubmitting} className="flex justify-center text-black text-3xl mb-20 font-semibold items-center text-center w-full bg-[#FAD869] h-16 rounded-md mt-8">
                                {isSubmitting ? <div className="flex justify-center items-center bg-[#a18837] h-full w-full text-black"> <Loader className="animate-spin text-black mx-2 " color="#000000" size={28} />Please Wait</div> : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}



// Form Fields are defined here     
const formFields = [
    {
        label: "Name",
        name: "name",
        type: "text",
        required: true,
        placeholder: "Enter your name",
    },
    {
        label: "Roll No.",
        name: "rollno",
        type: "text",
        required: true,
        placeholder: "Enter your name",
    },
    {
        label: "Contact No.",
        name: "contact no",
        type: "text",
        required: true,
        placeholder: "Enter your Contact No.",
    },
    {
        label: "Email Id",
        name: "email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
    },
];
