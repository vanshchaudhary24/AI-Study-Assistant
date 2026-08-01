import { useAuth } from "../../hooks/useAuth";

const WelcomeBanner = () => {

  const { user } = useAuth();

  return (

    <section className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10">

      <h1 className="text-4xl font-bold text-white">

        👋 Welcome Back,
        {" "}
        {user?.fullName || "Student"}

      </h1>

      <p className="mt-3 text-lg text-blue-100">

        Ready to learn something new today?

      </p>

    </section>

  );

};

export default WelcomeBanner;