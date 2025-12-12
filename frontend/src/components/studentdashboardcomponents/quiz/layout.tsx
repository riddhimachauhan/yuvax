// import Sidebar from "../sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
