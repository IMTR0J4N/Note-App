import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FormEvent, useState } from 'react';

export const SigninForm = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      // Handle error
      console.error(result.error);
    } else {
      redirect('/app')
    }
  };

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert('Veuillez entrer une adresse e-mail valide.');
      return false;
    }

    if (!password || password.length < 3) {
      alert('Le mot de passe doit comporter au moins 6 caractères.');
      return false;
    }

    return true;
  };

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-black dark:text-white">
                Connectez-vous !
              </h1>

              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    id="signin-email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 dark:text-neutral-200 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="john@doe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Adresse email
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    id="signin-password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 dark:text-neutral-200 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Mot de passe
                  </label>
                </div>

                <input
                  type="submit"
                  value="connexion"
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-black hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                />
              </form>
              <a
                href="#"
                className="mt-4 block text-sm text-center font-medium text-neutral-800 dark:text-neutral-200 hover:underline focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-neutral-200"
              >
                {' '}
                Mot de passe oublié ?{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
