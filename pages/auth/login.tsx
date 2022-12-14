import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LoginImg from '/public/img/login.jpeg';

type FormLoginData = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data: FormLoginData) => {
    await axios
      .post('/api/auth/login', data)
      .then((res) => {
        if (res.status === 200) {
          router.push('/home');
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
        <Image src={LoginImg} alt="home" />
      </div>
      <div className="w-1/3 ">
        <h1 className="text-2xl text-white"> </h1>
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
          <button className="button mt-5" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
