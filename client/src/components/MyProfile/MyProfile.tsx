/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ProfileComponent, ProfileComponentCreate } from './ProfileComponent';
import UploadPhoto from './UploadPhoto';
import './styles.css';
import Form from './Form';

interface RootState {
  profiles: ProfileState[]

  
}

interface ProfileState {
  userId?: string;
    _id? : number;
  photo?: string ;
  name?: string;
  email?: string;
  age?: string;
  gender?: string;
  DOB?: string;
  phoneNumber?: string;


}

interface User {
  result: {
    _id: string;
  };
}

const PhotoComponent: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem('profile')!) as User; // Using type assertion for user

  const profiles = useSelector((state: RootState) => state.profiles);

  const myProfile = useMemo(
    () => profiles.filter((p) => p.userId === user?.result?._id),
    [user, profiles]
  );

  const myProfileData = myProfile.length === 1 ? 'userExists' : 'userDoesNotExist';

  return (
    <div>
      {myProfile?.map((profile) => (
        <UploadPhoto profile={profile} key={profile._id} />
      ))}

      <div className="profileContainer">
        {myProfileData === 'userDoesNotExist' ? (
          <ProfileComponentCreate />
        ) : (
          myProfile?.map((profile) => (
            <ProfileComponent
              profile={profile}
              key={profile._id}
              />
            ))
          )}
        </div>
      </div>
    );
  };
              
              
              

const Profile: React.FC = () => {
  return (
    <div className="homeMain">
      <div className="homeBlueDiv">
        <p>MY PROFILE</p>
      </div>
      <div className="homeMainDiv">
        <PhotoComponent />
      </div>
    </div>
  );
};

export default Profile;
