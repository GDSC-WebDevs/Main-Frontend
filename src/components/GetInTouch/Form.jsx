"use client"

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";


const schema = z.object({
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(1, { message: "Please enter your message" }),
});



export default function Form() {


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });


      const onSubmit =async (data) => {
        console.log(data);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            toast.error('An error occurred while submitting the form. Please try again later.');
            return;
        }
        toast.success('Thank you for filling out the form. We will be in touch with you shortly', {
            duration: 5000,
        })
      }

  return (
    <div className="w-full ">
        <form className='w-[90%] mx-auto' onSubmit={handleSubmit(onSubmit)}>

        {formFields.map((field, index) => (
                <div key={index} >
                    <div className="flex flex-col  mt-3 w-full justify-center items-center mx-auto">
                    <label className="text-lg self-start font-geist text-[#E7E7E7]">{field.label}</label>
                    <input
                        className={field.height ? (`align-text-top h-64 mt-2 w-full px-2 rounded-lg self-center bg-[#292929] focus:placeholder-blue-400 focus:outline-none `) : (` focus:outline-none h-14 mt-2 w-full px-2 rounded-lg self-center bg-[#292929] focus:placeholder-blue-400`)}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name)}
                    />
                    </div>
                    {errors[field.name] && <p className="text-red-500 text-md">{errors[field.name].message}</p>}
                </div>
            ))}
            <button  disabled={isSubmitting} className='w-full mt-8 bg-[#FAD869] rounded-md  text-black text-lg font-bold'>{isSubmitting ? <div className="flex justify-center items-center bg-[#a18837] h-full w-full text-black rounded-md py-3"> <Loader className="animate-spin text-black mx-2 " color="#000000" size={28} />Please Wait</div> : <div className='w-full bg-[#FAD869] rounded-md py-3 text-black text-lg font-bold'>Send &#8599;</div> }</button>
        </form>
    </div>
  )
}


// Form Fields are defined here
const formFields=[
    {
        label:"Name",
        name:"name",
        type:"text",
        placeholder:"Enter Your Name"
    },
    {
        label:"Email",
        name:"email",
        type:"email",
        placeholder:"Enter Your Email"
    },
    {
        label:"Message",
        name:"message",
        type:"text",
        placeholder:"Enter Your Message"
    }
]