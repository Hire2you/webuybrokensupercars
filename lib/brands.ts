export const BRAND_PAGES = [
  { name: "Ferrari", slug: "sell-my-broken-ferrari", title: "Sell Your Broken Ferrari" },
  { name: "Porsche", slug: "sell-my-broken-porsche", title: "Sell Your Broken Porsche" },
];

export function getBrandPageHref(name: string): string | undefined {
  const page = BRAND_PAGES.find((item) => item.name === name);
  return page ? `/${page.slug}` : undefined;
}
