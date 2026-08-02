import { Oval } from "react-loader-spinner";

interface LoaderProps {
  text?: string;
}

const Loader = ({
  text = "Loading...",
}: LoaderProps) => {

  return (

    <div className="flex flex-col items-center justify-center py-10">

      <Oval
        height={45}
        width={45}
        color="#3B82F6"
        secondaryColor="#1E293B"
        strokeWidth={5}
      />

      <p className="mt-4 text-slate-400">
        {text}
      </p>

    </div>

  );

};

export default Loader;