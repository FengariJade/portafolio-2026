import { FooterAll } from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <div>{children}</div>
      <FooterAll hideRobot={true} />
    </div>
  );
}
