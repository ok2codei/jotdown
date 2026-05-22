import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-ui-canvas dark:bg-ui-canvas-dark text-black dark:text-white">


      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-5xl font-bold max-w-3xl leading-tight">
          Capture ideas without distraction
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          Organize notes, archive thoughts, and stay productive with JotDown.
        </p>

        <div className="flex gap-4 mt-8">
          <Link to="/auth/register">
          <button className="px-6 py-3 rounded-xl bg-brand-primary text-white">
          Get Started
          </button>
          </Link>

          <button className="px-6 py-3 rounded-xl border border-brand-primary ">
            Learn More
          </button>
        </div>

        {/* Placeholder Image */}
        <div className="mt-16 w-full max-w-5xl h-[400px] rounded-3xl border border-ui-border dark:border-ui-border-dark bg-ui-surface dark:bg-ui-surface-dark shadow-lg">
        </div>

      </section>
    </main>
  );
};

export default Home;