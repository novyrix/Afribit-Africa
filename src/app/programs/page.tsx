import { listPrograms } from '@/lib/content/programs';
import { ProgramsCatalog } from '@/components/programs/ProgramsCatalog';

export default async function ProgramsPage() {
  const programs = await listPrograms();

  return <ProgramsCatalog programs={programs} />;
}
