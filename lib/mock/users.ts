export type TeamRole = "partner" | "associate" | "paralegal" | "admin";
export type TeamStatus = "active" | "away" | "pending" | "invited";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  title: string;
  avatarTone: "blue" | "indigo" | "peach" | "mint" | "lavender" | "amber" | "rose";
  casesAssigned: number;
  activeValue: number; // sum of projected value of their active cases
  winRate?: number;
  lastActive: string; // ISO
  status: TeamStatus;
  joinedAt: string;
  twoFactor: boolean;
  pendingAIReviews: number;
}

export const TEAM: TeamMember[] = [
  {
    id: "u_01",
    name: "Sarah Chen",
    email: "schen@hartlaw.com",
    role: "partner",
    title: "Senior Partner",
    avatarTone: "indigo",
    casesAssigned: 18,
    activeValue: 6_400_000,
    winRate: 89.4,
    lastActive: "2026-04-28T08:18:00",
    status: "active",
    joinedAt: "2018-04-12",
    twoFactor: true,
    pendingAIReviews: 8,
  },
  {
    id: "u_02",
    name: "Marcus Reed",
    email: "mreed@hartlaw.com",
    role: "associate",
    title: "Associate Attorney",
    avatarTone: "blue",
    casesAssigned: 14,
    activeValue: 3_100_000,
    winRate: 82.6,
    lastActive: "2026-04-28T07:42:00",
    status: "active",
    joinedAt: "2022-09-01",
    twoFactor: true,
    pendingAIReviews: 3,
  },
  {
    id: "u_03",
    name: "Pia Okafor",
    email: "pokafor@hartlaw.com",
    role: "associate",
    title: "Senior Associate",
    avatarTone: "peach",
    casesAssigned: 11,
    activeValue: 2_840_000,
    winRate: 86.1,
    lastActive: "2026-04-26T16:12:00",
    status: "away",
    joinedAt: "2021-02-18",
    twoFactor: true,
    pendingAIReviews: 0,
  },
  {
    id: "u_04",
    name: "Devon Tate",
    email: "dtate@hartlaw.com",
    role: "paralegal",
    title: "Senior Paralegal",
    avatarTone: "mint",
    casesAssigned: 23,
    activeValue: 0,
    winRate: undefined,
    lastActive: "2026-04-28T08:01:00",
    status: "active",
    joinedAt: "2020-06-08",
    twoFactor: true,
    pendingAIReviews: 0,
  },
  {
    id: "u_05",
    name: "Jen Iyer",
    email: "jiyer@hartlaw.com",
    role: "admin",
    title: "Director of Operations",
    avatarTone: "lavender",
    casesAssigned: 0,
    activeValue: 0,
    winRate: undefined,
    lastActive: "2026-04-28T07:55:00",
    status: "active",
    joinedAt: "2019-11-04",
    twoFactor: true,
    pendingAIReviews: 0,
  },
  {
    id: "u_06",
    name: "Liam Patel",
    email: "lpatel@hartlaw.com",
    role: "paralegal",
    title: "Paralegal",
    avatarTone: "amber",
    casesAssigned: 9,
    activeValue: 0,
    winRate: undefined,
    lastActive: "2026-04-27T19:33:00",
    status: "active",
    joinedAt: "2026-03-01",
    twoFactor: false,
    pendingAIReviews: 0,
  },
  {
    id: "u_07",
    name: "Nadia Wong",
    email: "nwong@hartlaw.com",
    role: "associate",
    title: "Associate Attorney",
    avatarTone: "rose",
    casesAssigned: 0,
    activeValue: 0,
    lastActive: "",
    status: "invited",
    joinedAt: "2026-04-22",
    twoFactor: false,
    pendingAIReviews: 0,
  },
  {
    id: "u_08",
    name: "Chris Romano",
    email: "cromano@hartlaw.com",
    role: "paralegal",
    title: "Paralegal",
    avatarTone: "blue",
    casesAssigned: 0,
    activeValue: 0,
    lastActive: "",
    status: "pending",
    joinedAt: "2026-04-25",
    twoFactor: false,
    pendingAIReviews: 0,
  },
];

export const TEAM_STATS = {
  total: 8,
  active_cases_assigned: 75,
  avg_utilization_pct: 78,
  pending_invites: 2,
};
