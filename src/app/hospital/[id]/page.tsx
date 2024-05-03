'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { SearchIcon } from '@/components/Icons/Icons';
import { FacebookStyleLoader } from '@/components/Loader/FacebookStyleLoader';
import { useGetHospitalProcedureById } from '@/hooks/useHospital';
import backArrow from '@/public/assets/icons/backArrow.svg';
import hospitalLogo from '@/public/assets/icons/sampleLogo.svg';
import sampleProfile from '@/public/assets/icons/sampleProfile.svg';

import style from './style.module.scss';

function TeamMemberCard({ name, role }: { name: string; role: string }) {
  return (
    <div
      className="flex items-start rounded-xl border border-neutral-5 py-5 pl-5 pr-10"
      style={{
        boxShadow: '2px 2px 4px 1px rgba(9, 111, 144, 0.1)',
      }}
    >
      <Image
        src={sampleProfile}
        alt="sample profile image"
        className="size-12 rounded-full"
      />
      <div className="ml-3 flex flex-col items-start">
        <p className="font-poppins text-xl font-medium text-neutral-1">
          {name}
        </p>
        <p className="font-lexend text-base font-light text-neutral-2">
          {role}
        </p>
      </div>
    </div>
  );
}

export { TeamMemberCard };

function HospitalDetailsPage({ params }: { params: { id: string } }) {
  const [searchMemberQuery, setSearchMemberQuery] = React.useState<string>('');
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const hospitalProcedureId = useGetHospitalProcedureById({
    id: params.id,
  });
  console.log({ hospitalProcedureId });
  const router = useRouter();
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <div className={style.hospitalDetailPageContainer}>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => router.back()}
      >
        <Image src={backArrow} alt="back arrow icon" />
      </button>

      {hospitalProcedureId.isLoading ? (
        <FacebookStyleLoader />
      ) : (
        <>
          <div className={style.headerSection}>
            <div className={style.titleContainer}>
              <Image
                className={style.hospitalLogo}
                src={hospitalLogo}
                alt="hospital logo"
              />

              <div className={style.titleBreadCrumbContainer}>
                {hospitalProcedureId.isSuccess &&
                  hospitalProcedureId.data.data && (
                    <h3>{hospitalProcedureId.data.data.procedure.name.en}</h3>
                  )}

                {hospitalProcedureId.isSuccess &&
                  hospitalProcedureId.data.data && (
                    <div className={style.breadcrumb}>
                      <Link href="/">
                        {
                          hospitalProcedureId.data.data.procedure.category.name
                            .en
                        }{' '}
                        department
                      </Link>
                      <span>/</span>
                      <Link href="/">Procedure details</Link>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <h3 className={style.subTitle}>About the procedure</h3>
          {hospitalProcedureId.isSuccess && hospitalProcedureId.data.data && (
            <p className={style.hospitalDesc}>
              {hospitalProcedureId.data.data.description.en}
            </p>
          )}

          {hospitalProcedureId.isSuccess && hospitalProcedureId.data.data && (
            <div className="flex w-[520px] flex-wrap items-center gap-10">
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  Cost of procedure
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {hospitalProcedureId.data.data.cost.en}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  Wait of procedure
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {hospitalProcedureId.data.data.waitingTime}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  Duration of city stay
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {hospitalProcedureId.data.data.stayInCity}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  Duration of hospital stay
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {hospitalProcedureId.data.data.stayInHospital}
                </p>
              </div>
            </div>
          )}

          <h3 className={style.subTitle} style={{ marginTop: '40px' }}>
            Procedure team
          </h3>
          {hospitalProcedureId.isSuccess && hospitalProcedureId.data.data && (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {!(
                hospitalProcedureId.data.data.hospitalMembers.length === 0
              ) && (
                <div className={style.teamMemberViewSection}>
                  <div className="my-[32px] flex items-center justify-between">
                    <div className="relative">
                      <input
                        className="rounded-lg border border-neutral-4 px-4 py-[10px]"
                        type="text"
                        name="search-member"
                        id="search-member"
                        value={searchMemberQuery}
                        onChange={(e) => setSearchMemberQuery(e.target.value)}
                      />
                      <SearchIcon className="absolute right-4 top-4 size-4" />
                    </div>
                  </div>

                  <div className={style.teamMemberCardsContainer}>
                    {searchMemberQuery
                      ? hospitalProcedureId.data.data.hospitalMembers
                          .filter((member) =>
                            member.name
                              .toLowerCase()
                              .includes(searchMemberQuery.toLowerCase()),
                          )
                          .map((member) => {
                            return (
                              <TeamMemberCard
                                name={member.name}
                                role={member.position.en}
                                key={member.id}
                              />
                            );
                          })
                      : hospitalProcedureId.data.data.hospitalMembers.map(
                          (member) => {
                            return (
                              <TeamMemberCard
                                name={member.name}
                                role={member.position.en}
                                key={member.id}
                              />
                            );
                          },
                        )}
                    {}
                  </div>
                </div>
              )}
            </>
          )}
          <div className="flex flex-col items-start ">
            <h3 className="mb-6 font-poppins text-2xl font-medium text-gray77">
              About the hospital
            </h3>
            <p className="font-lexend text-base font-light text-neutral-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniammodo Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniammodo Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniammodo
            </p>
          </div>
          <div className="mb-[47px] mt-[62px] flex w-full items-center justify-between rounded-[6.4px] bg-darkslategray px-9 py-[34px]">
            <div className="flex flex-col items-start">
              <span className="font-poppins text-3xl font-medium text-neutral-7">
                {hospitalProcedureId?.data?.data.procedure.name.en}
              </span>
              <span className="font-poppins text-xl font-normal text-neutral-6">
                12/Feb/2024 - 23/May/2024
              </span>
            </div>
            <button
              type="button"
              className="fixed h-[64px] w-[348px] rounded-[6.4px] bg-primary-5"
            >
              <span className="font-poppins text-2xl font-normal text-darkslategray">
                Request an appointment
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default HospitalDetailsPage;
