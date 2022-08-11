import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Image from 'next/image';
import RegisterImg from '/public/img/register.jpeg';

type FormRegisterData = {
  username: string;
  password: string;
};

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FormRegisterData) => {
    await axios
      .post('/api/auth/register', data)
      .then((res) => {
        if (res.status === 200) {
          router.push('/auth/login');
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full flex flex-row items-center justify-center space-x-10 py-10">
      <div className="w-2/3">
        <Image src={RegisterImg} alt="home" />
      </div>
      <div className="w-1/3 ">
        <h1 className="text-sm text-white mb-5">
          The there isn&apos;t a database for register😬😬
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col justify-center align-center"
        >
          <div>
            <div className="flex flex-col">
              <label className="text-white">Username</label>
              <input className="input" {...register('username', { required: true })} />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-white">Psw</label>
              <input className="input" type="password" {...register('psw', { required: true })} />s
            </div>
          </div>
          <button className="button mt-5 text-sm " type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
