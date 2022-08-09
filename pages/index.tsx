import Image from 'next/image';
import IndexImg from '../public/img/index.jpeg';
export default function Index() {
  return (
    <div className="w-full flex flex-row justify-center items-center py-10 space-x-10 ">
      <div className="w-2/3 ">
        <Image src={IndexImg} alt="home" />
      </div>
      <div className="w-1/3 flex flex-col items-center justify-center ">
        <h1 className="text-2xl text-white">Learning Authentication</h1>
      </div>
    </div>
  );
}
