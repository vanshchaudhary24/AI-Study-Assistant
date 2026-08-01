import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import PasswordInput from "../auth/PasswordInput";

import { changePassword }
from "../../services/auth.service";

interface FormData{
    oldPassword:string;
    newPassword:string;
}

const ChangePasswordForm=()=>{

const{
register,
handleSubmit,
formState:{isSubmitting},
}=useForm<FormData>();

const onSubmit=async(
data:FormData
)=>{

try{

const response=
await changePassword(
data.oldPassword,
data.newPassword
);

toast.success(response.message);

}catch(error:any){

toast.error(
error?.response?.data?.message
);

}

};

return(

<form
onSubmit={handleSubmit(onSubmit)}
className="rounded-2xl border border-slate-800 bg-slate-900 p-8 space-y-5"
>

<h2 className="text-xl font-semibold text-white">

Change Password

</h2>

<PasswordInput
placeholder="Current Password"
register={register("oldPassword")}
/>

<PasswordInput
placeholder="New Password"
register={register("newPassword")}
/>

<button
className="rounded-xl bg-blue-600 px-6 py-3 text-white"
>

Update Password

</button>

</form>

);

};

export default ChangePasswordForm;