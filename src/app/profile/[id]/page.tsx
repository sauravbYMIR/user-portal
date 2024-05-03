'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { FacebookStyleLoader } from '@/components/Loader/FacebookStyleLoader';
import { useGetHospitalProcedureById } from '@/hooks/useHospital';
import backArrow from '@/public/assets/icons/backArrow.svg';

import style from '../../hospital/[id]/style.module.scss';

function HospitalDetailsPage({ params }: { params: { id: string } }) {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const hospitalProcedureId = useGetHospitalProcedureById({
    id: params.id,
  });
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
          <div className="mb-[47px] mt-[62px] w-full items-center justify-between rounded-[6.4px] border border-neutral-7 bg-neutral-7 px-9 py-[34px] sm:flex">
            <span className="w-[90%] font-poppins text-xl font-normal text-neutral-1">
              Your application has been approved by PSH Hospitall, please
              complete the information capture form to continue with the booking
              process
            </span>
            <button
              type="button"
              className="mt-2 w-full rounded-[6.4px] bg-primary-1 py-4 sm:mt-0 sm:w-[348px]"
            >
              <span className="font-poppins text-2xl font-normal text-white">
                Add case details
              </span>
            </button>
          </div>
          {hospitalProcedureId.isSuccess && hospitalProcedureId.data.data && (
            <div className="grid grid-cols-2 gap-20">
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
        </>
      )}
    </div>
  );
}

export default HospitalDetailsPage;
