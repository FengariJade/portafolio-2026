import { getI18n, getCurrentLocale } from "@/locales/server";
import { menu, MenuType } from "@/data/information";
import { HeaderContent } from "./header-content";

export async function Header() {
  const t = await getI18n();

  const menuOptions: MenuType[] = menu.map((item) => ({
    ...item,
    label: t(item.label as keyof typeof t),
    children: item.children?.map((it) => ({
      ...it,
      label: t(it.label as keyof typeof t),
    })),
  }));
  return (
    <div className="relative">
      <HeaderContent menuOptions={menuOptions} />
    </div>
  );
}
