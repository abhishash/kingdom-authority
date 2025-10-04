import { ChartAreaInteractive } from "./dashboard/default/_components/chart-area-interactive";
import { DataTable } from "./dashboard/default/_components/data-table";
import { SectionCards } from "./dashboard/default/_components/section-cards";
import data from "./dashboard/default/_components/data.json";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </div>
  );
}
