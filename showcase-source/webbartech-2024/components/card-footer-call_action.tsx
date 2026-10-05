import { getCurrentLocale, getI18n } from "@/locales/server";
import { CardFooterCallActionClient } from "./card-footer-call-action-client";

export const CardFooterCallAction = async () => {
  const t = await getI18n();
  const locale = await getCurrentLocale();

  const translations = {
    titleFirst: t("footer.call_to_action.title.first"),
    titleSecond: t("footer.call_to_action.title.second"),
    description: t("footer.call_to_action.description"),
    phone: t("footer.call_to_action.phone"),
    email: t("footer.call_to_action.email"),
    address: t("footer.call_to_action.address"),
    contactUs: t("label.contact_us"),
  };

  return <CardFooterCallActionClient translations={translations} locale={locale} />;
};