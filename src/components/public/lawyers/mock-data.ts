export type Lawyer = {
  id: string;
  name: string;
  bnName: string;
  practice: string;
  city: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  education: string;
  bnEducation: string;
  bio: string;
  bnBio: string;
};
export const practiceLabels: Record<string, { en: string; bn: string }> = {
  family: { en: "Family law", bn: "পারিবারিক আইন" },
  criminal: { en: "Criminal law", bn: "ফৌজদারি আইন" },
  property: { en: "Property law", bn: "সম্পত্তি আইন" },
  corporate: { en: "Corporate law", bn: "কর্পোরেট আইন" },
  labor: { en: "Labour law", bn: "শ্রম আইন" },
  civil: { en: "Civil law", bn: "দেওয়ানি আইন" },
};
export const cityLabels: Record<string, { en: string; bn: string }> = {
  dhaka: { en: "Dhaka", bn: "ঢাকা" },
  chattogram: { en: "Chattogram", bn: "চট্টগ্রাম" },
  sylhet: { en: "Sylhet", bn: "সিলেট" },
  rajshahi: { en: "Rajshahi", bn: "রাজশাহী" },
};
export const lawyerDirectory: Lawyer[] = [
  [
    "farhana-rahman",
    "Farhana Rahman",
    "ফারহানা রহমান",
    "family",
    "dhaka",
    12,
    4.9,
    87,
    1500,
  ],
  [
    "arif-mahmud",
    "Arif Mahmud",
    "আরিফ মাহমুদ",
    "criminal",
    "chattogram",
    9,
    4.8,
    62,
    1200,
  ],
  [
    "nusrat-jahan",
    "Nusrat Jahan",
    "নুসরাত জাহান",
    "property",
    "dhaka",
    15,
    4.9,
    113,
    2000,
  ],
  [
    "tanvir-hossain",
    "Tanvir Hossain",
    "তানভীর হোসেন",
    "corporate",
    "sylhet",
    11,
    4.7,
    51,
    1800,
  ],
  [
    "sadia-islam",
    "Sadia Islam",
    "সাদিয়া ইসলাম",
    "labor",
    "rajshahi",
    8,
    4.6,
    42,
    1000,
  ],
  [
    "mahmud-hasan",
    "Mahmud Hasan",
    "মাহমুদ হাসান",
    "civil",
    "dhaka",
    18,
    4.9,
    129,
    2200,
  ],
  [
    "rahima-akter",
    "Rahima Akter",
    "রাহিমা আক্তার",
    "family",
    "sylhet",
    7,
    4.5,
    31,
    900,
  ],
  [
    "imran-kabir",
    "Imran Kabir",
    "ইমরান কবির",
    "criminal",
    "rajshahi",
    14,
    4.8,
    95,
    1700,
  ],
  [
    "lamia-chowdhury",
    "Lamia Chowdhury",
    "লামিয়া চৌধুরী",
    "corporate",
    "chattogram",
    10,
    4.7,
    55,
    1600,
  ],
  [
    "sakib-ahmed",
    "Sakib Ahmed",
    "সাকিব আহমেদ",
    "property",
    "dhaka",
    6,
    4.4,
    28,
    800,
  ],
  [
    "tahmina-yesmin",
    "Tahmina Yesmin",
    "তাহমিনা ইয়াসমিন",
    "civil",
    "chattogram",
    13,
    4.8,
    76,
    1400,
  ],
  [
    "rafiqul-alam",
    "Rafiqul Alam",
    "রফিকুল আলম",
    "labor",
    "rajshahi",
    16,
    4.7,
    69,
    1300,
  ],
].map(
  ([id, name, bnName, practice, city, experience, rating, reviews, fee]) => ({
    id: String(id),
    name: String(name),
    bnName: String(bnName),
    practice: String(practice),
    city: String(city),
    experience: Number(experience),
    rating: Number(rating),
    reviews: Number(reviews),
    fee: Number(fee),
    education: "LL.B., LL.M. — fictional profile",
    bnEducation: "এলএল.বি., এলএল.এম. — কাল্পনিক প্রোফাইল",
    bio: "Provides initial legal consultations and case guidance within their stated practice area. This is a fictional demonstration profile.",
    bnBio:
      "নিজ নিজ আইনক্ষেত্রে প্রাথমিক পরামর্শ ও মামলা সংক্রান্ত দিকনির্দেশনা প্রদান করেন। এটি সম্পূর্ণ কাল্পনিক ডেমো প্রোফাইল।",
  }),
);
export const findLawyer = (id: string) =>
  lawyerDirectory.find((lawyer) => lawyer.id === id);
