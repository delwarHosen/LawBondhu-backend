import LawyerProfile from "@/components/public/lawyers/profile";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <LawyerProfile id={id} />;
}
