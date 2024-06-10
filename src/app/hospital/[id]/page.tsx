import type { HospitalProcedureByIdType } from '@/hooks/useHospital';

import HospitalDetailsPage from './HospitalDetailsPage';

async function getData(hospitalId: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/hospital-procedure/procedure-details/${hospitalId}`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = (await getData(params.id)) as {
    success: boolean;
    data: HospitalProcedureByIdType;
  };

  return <HospitalDetailsPage hospitalProcedureId={data} />;
}
