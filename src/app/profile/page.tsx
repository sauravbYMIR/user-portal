'use clients';

import React from 'react';

import { ProfileHeader } from '@/components/Header/ProfileHeader';
import { ProcedureCard } from '@/components/ProcedureCard/ProcedureCard';

const proceduresDummyArr = [
  {
    procedureName: 'Breast removal and reconstruction',
    hospitalName: 'PSH Hospital',
    city: 'Oslo',
    country: 'Norway',
    hospitalStay: '12',
    applicationStatus: 'Application sent',
    waitTime: '3-4 weeks',
  },
  {
    procedureName: 'Breast removal and reconstruction',
    hospitalName: 'PSH Hospital',
    city: 'Oslo',
    country: 'Norway',
    hospitalStay: '12',
    applicationStatus: 'Request accepted',
    waitTime: '3-4 weeks',
  },
  {
    procedureName: 'Breast removal and reconstruction',
    hospitalName: 'PSH Hospital',
    city: 'Oslo',
    country: 'Norway',
    hospitalStay: '12',
    applicationStatus: 'Request rejected',
    waitTime: '3-4 weeks',
  },
  {
    procedureName: 'Breast removal and reconstruction',
    hospitalName: 'PSH Hospital',
    city: 'Oslo',
    country: 'Norway',
    hospitalStay: '12',
    applicationStatus: 'Request accepted',
    waitTime: '3-4 weeks',
  },
];

const Profile = () => {
  return (
    <main className="flex w-screen flex-col">
      <ProfileHeader />
      {/* <CreateAccount /> */}
      <div className="flex flex-col items-start px-20">
        <h2 className="mb-[73px] text-start font-poppins text-5xl font-normal text-neutral-1">
          My procedures
        </h2>
        <div className="flex flex-col gap-4">
          {proceduresDummyArr.map((procedure) => {
            return (
              <ProcedureCard
                key={procedure.procedureName}
                procedureName={procedure.procedureName}
                hospitalName={procedure.hospitalName}
                city={procedure.city}
                country={procedure.country}
                hospitalStay={procedure.hospitalStay}
                applicationStatus={procedure.applicationStatus}
                waitTime={procedure.waitTime}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Profile;
