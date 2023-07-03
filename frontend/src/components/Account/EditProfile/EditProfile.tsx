import React, { useState } from "react";

import { useAppSelector,useAppDispatch } from "../../../store/store";
import { setError } from "../../../actions/error";
import { editProfile } from "../../../actions/user";

import "./EditProfile.scss";

interface EditProfileData {
  name: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const initialEditProfileData: EditProfileData = {
    name: user.name,
    email: user.email,
    newPassword: "",
    confirmNewPassword: "",
  };

  const [editProfileData, setEditProfileData] = useState<EditProfileData>(initialEditProfileData);

  const editProfileHandler = (event: any) => {
    event.preventDefault();

    if (editProfileData.name.length === 0) {
      dispatch(setError("Name is required"))
      return;
    }
    if (editProfileData.newPassword.length < 6) {
      dispatch(setError("Password should have at least 6 characters"));
      return;
    }
    if (editProfileData.newPassword !== editProfileData.confirmNewPassword) {
      dispatch(setError("Password and confirm password must coincide"));
      return;
    }
    dispatch(editProfile(editProfileData,user));

  };

  return (
    <div className="profile">
      <h1>Edit profile</h1>
      <form onSubmit={editProfileHandler}>
        <label>Name</label>
        <input
          type="text"
          value={editProfileData.name}
          onChange={(e) =>
            setEditProfileData((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <label>Email</label>
        <input
          type="email"
          value={editProfileData.email}
          onChange={(e) =>
            setEditProfileData((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
        <label> New password</label>
        <input
          type="password"
          value={editProfileData.newPassword}
          onChange={(e) =>
            setEditProfileData((prevState) => ({
              ...prevState,
              newPassword: e.target.value,
            }))
          }
        />
        <label>Confirm new password</label>
        <input
          type="password"
          value={editProfileData.confirmNewPassword}
          onChange={(e) =>
            setEditProfileData((prevState) => ({
              ...prevState,
              confirmNewPassword: e.target.value,
            }))
          }
        />
        <br/> 
        <button className="full-button">Save changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
