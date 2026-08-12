import { redirect } from "next/navigation";
import { defaultLocale } from "@gytev/i18n";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
