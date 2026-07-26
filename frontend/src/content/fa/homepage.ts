import type { BirthChartFormState } from "../../types";
import type { Service, Testimonial } from "../../types";

export const principles = [
  {
    title: "ابزار، نه فال",
    body: "چارت، ثبت دقیق جایگاه خورشید، ماه و سیارات در لحظهٔ تولد شماست — مثل صفحهٔ یک ساز، نه پیشگویی.",
  },
  {
    title: "جایگاه بر معنا",
    body: "محل قرارگیری هر سیاره مهم‌تر از «معنای» کلیشه‌ای آن است. موقعیت، داده است. معنا را در جلسه با هم می‌سازیم.",
  },
  {
    title: "قابل بازتولید",
    body: "هر کسی با همان تاریخ، ساعت و مکان تولد می‌تواند چارت را دقیقاً دوباره محاسبه کند. روش کهنه است؛ ریاضی هنوز پابرجاست.",
  },
] as const;

export const birthChartCopy = {
  eyebrow: { index: "۰۲", label: "ساخت چارت" },
  title: "چهار جزئیات. یک خوانش دقیق.",
  subtitle:
    "تا زمانی که ارسال نکنید چیزی فرستاده نمی‌شود — اما همین که تایپ می‌کنید، بخشی از چارت روشن می‌شود.",
  fields: {
    name: { label: "نام کامل", placeholder: "سارا محمدی" },
    date: { label: "تاریخ تولد" },
    time: { label: "ساعت تولد" },
    location: { label: "محل تولد", placeholder: "تهران، ایران" },
  } satisfies Record<
    keyof BirthChartFormState,
    { label: string; placeholder?: string }
  >,
  submit: "ساخت چارت من",
  success: {
    tag: "ثبت شد",
    title: "درخواست چارت شما رسید.",
    body: "برای هماهنگی زمان جلسه، به زودی با شما تماس می‌گیریم.",
  },
  aligned: (count: number) => `${count.toLocaleString("fa-IR")}/۴ هم‌تراز`,
};

export const servicesFa: Service[] = [
  {
    id: "natal",
    name: "خوانش چارت تولد",
    duration: "۷۵ دقیقه",
    price: "۹,۵۰۰,۰۰۰ تومان",
    description:
      "خوانش کامل آسمان در دقیقهٔ تولد شما — جایگاه‌ها، زوایا و شکل کلی چارت.",
    includes: [
      "محاسبهٔ کامل چارت",
      "ضبط جلسه",
      "خلاصهٔ نوشتاری تا ۴۸ ساعت",
    ],
  },
  {
    id: "synastry",
    name: "جلسهٔ سیناستری",
    duration: "۹۰ دقیقه",
    price: "۱۲,۰۰۰,۰۰۰ تومان",
    description:
      "دو چارت، روی هم. جایی که هم‌سو هستند، جایی که نیستند — و آن اصطکاک واقعاً چه می‌گوید.",
    includes: ["مقایسهٔ دو چارت", "مرور چارت مرکب", "ضبط جلسه"],
  },
  {
    id: "forecast",
    name: "پیش‌بینی سالانه",
    duration: "۶۰ دقیقه",
    price: "۷,۵۰۰,۰۰۰ تومان",
    description:
      "ترانزیت‌های پیش‌رو، روی چارت تولد شما. نه پیشگویی — مختصاتِ هوایی که همین حالا در آن حرکت می‌کنید.",
    includes: [
      "نقشهٔ ترانزیت ۱۲ ماه",
      "فهرست تاریخ‌های کلیدی",
      "خلاصهٔ نوشتاری",
    ],
  },
  {
    id: "practice",
    name: "همراهی ماهانه",
    duration: "ماهانه",
    price: "۵,۵۰۰,۰۰۰ تومان/ماه",
    description:
      "یک جلسهٔ ثابت هر ماه، هم‌زمان با حرکت آسمان. برای کسانی که ترجیح می‌دهند یک‌بار در سال نخوانند.",
    includes: [
      "جلسهٔ ۳۰ دقیقه‌ای ماهانه",
      "اولویت در رزرو",
      "پیام بین جلسات",
    ],
  },
];

export const testimonialsFa: (Testimonial & { constellationLabel: string })[] = [
  {
    id: "t1",
    quote:
      "چارت من را طوری خواند که انگار نقشهٔ ساختمانی را که سال‌ها در آن زندگی کرده بودم، ناگهان به دستم داده بودند.",
    attribution: "ر. — خوانش چارت تولد",
    constellationId: "lyra",
    constellationLabel: "شلیاق",
  },
  {
    id: "t2",
    quote:
      "نه دل‌نوازهای مبهم، نه زبان ستون‌های فال. فقط دقت مشخص، گاهی ناآرام‌کننده و همیشه درست.",
    attribution: "م. — پیش‌بینی سالانه",
    constellationId: "cassiopeia",
    constellationLabel: "ذات‌الکرسی",
  },
  {
    id: "t3",
    quote:
      "جلسهٔ سیناستری دوستی‌ای را که ده سال درباره‌اش سردرگم بودم، در چهل دقیقه روشن کرد.",
    attribution: "ج. — سیناستری",
    constellationId: "aquila",
    constellationLabel: "عقاب",
  },
];

export const contactCopy = {
  eyebrow: { index: "۰۵", label: "میقات" },
  title: "آسمان زمان را می‌داند.",
  subtitle: "نامه‌ای بنویسید — دربارهٔ آنچه می‌خواهید بفهمید.",
  ephemeris: {
    body: "ماه",
    coords: "۱۴°۳۲′ سرتاسری · ۲۳°۱۸′ میل",
    phaseFa: "محتاج افزایشی",
  },
  form: {
    email: { label: "ایمیل", placeholder: "name@example.com" },
    message: {
      label: "پیام",
      placeholder: "دنبال چه درکی هستید؟",
    },
    submit: "ارسال پیام",
    success: "پیام رسید. به زودی پاسخ می‌دهیم.",
  },
  footer: "Meridian — خوانش در سراسر جهان",
  orbitLabels: {
    moon: "ماه",
    vacant: "جای خالی",
  },
};
