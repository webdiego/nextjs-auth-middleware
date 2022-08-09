import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  let pathName = router.pathname;
  const logout = async () => {
    await axios
      .post('/api/auth/logout')
      .then((res) => {
        if (res.status === 200) {
          router.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Head>
        <title>Auth</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-silver-900">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between border-b border-white lg:border-none">
            <div className="flex items-center">
              <Link href="/">
                <p className="text-white cursor-pointer">Home</p>
              </Link>
            </div>
            <div className="ml-10 space-x-4">
              {pathName === '/' && (
                <a
                  href="/auth/login"
                  className="inline-block bg-black py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >
                  Login
                </a>
              )}

              {pathName === '/home' ? (
                <a
                  onClick={() => logout()}
                  className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-black border-black "
                >
                  Logout
                </a>
              ) : (
                <a
                  href="/auth/register"
                  className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-black border-black "
                >
                  Register
                </a>
              )}
            </div>
          </div>
        </nav>
      </header>
      <div className="max-w-7xl mx-auto">{children}</div>

      <footer>
        <h1>hello</h1>
      </footer>
    </>
  );
}
