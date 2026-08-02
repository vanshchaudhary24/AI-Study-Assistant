const WelcomeBanner = () => {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (

    <div className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-xl">

      <h1 className="text-4xl font-bold text-white">

        {greeting} 👋

      </h1>

      <p className="mt-3 text-lg text-blue-100">

        Welcome back to your AI Study Assistant.

      </p>

      <p className="mt-2 text-sm text-blue-200">

        {new Date().toLocaleDateString(undefined,{
          weekday:"long",
          year:"numeric",
          month:"long",
          day:"numeric"
        })}

      </p>

    </div>

  );

};

export default WelcomeBanner;