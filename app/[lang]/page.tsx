import { Locale, getDictionary } from "../../get-dictionary";
import "../globals.css";

type HomePageProps = {
  params: {
    lang: Locale;
  };
};

const HomePage = async ({ params: { lang } }: HomePageProps) => {
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">{dictionary.homepage.welcome}</h1>
    </main>
  );
};

export default HomePage;
