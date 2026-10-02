import SiteLayout from "../site-layout";

export { metadata } from "../site-layout";

export default function EntryLayout({ children }: LayoutProps<"/">) {
  return <SiteLayout>{children}</SiteLayout>;
}
