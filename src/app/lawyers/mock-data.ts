
export type PracticeArea =
  | "family"
  | "criminal"
  | "property"
  | "corporate"
  | "labor"
  | "civil";

export type LawyerCity =
  | "dhaka"
  | "chattogram"
  | "sylhet"
  | "rajshahi";

export type Lawyer = {
  id: string;
  name: string;
  bnName: string;
  practice: PracticeArea;
  city: LawyerCity;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  education: string;
  bnEducation: string;
  bio: string;
  bnBio: string;
};

export const practiceAreas: PracticeArea[] = [
  "family",
  "criminal",
  "property",
  "corporate",
  "labor",
  "civil",
];

export const lawyerCities: LawyerCity[] = [
  "dhaka",
  "chattogram",
  "sylhet",
  "rajshahi",
];

type LawyerSeed = Pick<
  Lawyer,
  | "id"
  | "name"
  | "bnName"
  | "practice"
  | "city"
  | "experience"
  | "rating"
  | "reviews"
  | "fee"
>;

const lawyerSeeds: LawyerSeed[] = [
  {
    id: "farhana-rahman",
    name: "Farhana Rahman",
    bnName: "ফারহানা রহমান",
    practice: "family",
    city: "dhaka",
    experience: 12,
    rating: 4.9,
    reviews: 87,
    fee: 1500,
  },
  {
    id: "arif-mahmud",
    name: "Arif Mahmud",
    bnName: "আরিফ মাহমুদ",
    practice: "criminal",
    city: "chattogram",
    experience: 9,
    rating: 4.8,
    reviews: 62,
    fee: 1200,
  },
  {
    id: "nusrat-jahan",
    name: "Nusrat Jahan",
    bnName: "নুসরাত জাহান",
    practice: "property",
    city: "dhaka",
    experience: 15,
    rating: 4.9,
    reviews: 113,
    fee: 2000,
  },
  {
    id: "tanvir-hossain",
    name: "Tanvir Hossain",
    bnName: "তানভীর হোসেন",
    practice: "corporate",
    city: "sylhet",
    experience: 11,
    rating: 4.7,
    reviews: 51,
    fee: 1800,
  },
  {
    id: "sadia-islam",
    name: "Sadia Islam",
    bnName: "সাদিয়া ইসলাম",
    practice: "labor",
    city: "rajshahi",
    experience: 8,
    rating: 4.6,
    reviews: 42,
    fee: 1000,
  },
  {
    id: "mahmud-hasan",
    name: "Mahmud Hasan",
    bnName: "মাহমুদ হাসান",
    practice: "civil",
    city: "dhaka",
    experience: 18,
    rating: 4.9,
    reviews: 129,
    fee: 2200,
  },
  {
    id: "rahima-akter",
    name: "Rahima Akter",
    bnName: "রাহিমা আক্তার",
    practice: "family",
    city: "sylhet",
    experience: 7,
    rating: 4.5,
    reviews: 31,
    fee: 900,
  },
  {
    id: "imran-kabir",
    name: "Imran Kabir",
    bnName: "ইমরান কবির",
    practice: "criminal",
    city: "rajshahi",
    experience: 14,
    rating: 4.8,
    reviews: 95,
    fee: 1700,
  },
  {
    id: "lamia-chowdhury",
    name: "Lamia Chowdhury",
    bnName: "লামিয়া চৌধুরী",
    practice: "corporate",
    city: "chattogram",
    experience: 10,
    rating: 4.7,
    reviews: 55,
    fee: 1600,
  },
  {
    id: "sakib-ahmed",
    name: "Sakib Ahmed",
    bnName: "সাকিব আহমেদ",
    practice: "property",
    city: "dhaka",
    experience: 6,
    rating: 4.4,
    reviews: 28,
    fee: 800,
  },
  {
    id: "tahmina-yesmin",
    name: "Tahmina Yesmin",
    bnName: "তাহমিনা ইয়াসমিন",
    practice: "civil",
    city: "chattogram",
    experience: 13,
    rating: 4.8,
    reviews: 76,
    fee: 1400,
  },
  {
    id: "rafiqul-alam",
    name: "Rafiqul Alam",
    bnName: "রফিকুল আলম",
    practice: "labor",
    city: "rajshahi",
    experience: 16,
    rating: 4.7,
    reviews: 69,
    fee: 1300,
  },
];

// All lawyer records are fictional.
// Bilingual profile content is kept here as mock data.
// Reusable UI labels are stored in the translation JSON files.
export const lawyerDirectory: Lawyer[] = lawyerSeeds.map(
  (lawyer) => ({
    ...lawyer,
    education: "LL.B., LL.M. — fictional profile",
    bnEducation: "এলএল.বি., এলএল.এম. — কাল্পনিক প্রোফাইল",
    bio:
      "Provides initial legal consultations and case guidance " +
      "within their stated practice area. " +
      "This is a fictional demonstration profile.",
    bnBio:
      "নিজ নিজ আইনক্ষেত্রে প্রাথমিক পরামর্শ ও মামলা সংক্রান্ত " +
      "দিকনির্দেশনা প্রদান করেন। " +
      "এটি সম্পূর্ণ কাল্পনিক ডেমো প্রোফাইল।",
  })
);

export function findLawyer(
  id: string
): Lawyer | undefined {
  return lawyerDirectory.find(
    (lawyer) => lawyer.id === id
  );
}
