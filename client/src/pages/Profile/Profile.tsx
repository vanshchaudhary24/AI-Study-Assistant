import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileInfoForm from "../../components/profile/ProfileInfoForm";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";
import AvatarUpload from "../../components/profile/AvatarUpload";

const Profile = () => {

  return (

    <>

      <ProfileHeader />

      <div className="mb-8">

        <AvatarUpload />

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <ProfileInfoForm />

        <ChangePasswordForm />

      </div>

    </>

  );

};

export default Profile;