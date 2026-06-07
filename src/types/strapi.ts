export interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// In Strapi v5, relationships and components are flat.
// We'll define the components used in the Homepage.

export interface HeroComponent {
  id: number;
  tagline: string;
  headline: string;
  subtext: string;
  backgroundImage?: Media;
}

export interface StatComponent {
  id: number;
  number: string;
  label: string;
  iconName: string;
}

export interface AboutComponent {
  id: number;
  title: string;
  description: any; // blocks
  image?: Media;
}

export interface MissionPoint {
  id: number;
  text: string;
}

export interface VisionMissionComponent {
  id: number;
  visionText: string;
  missionPoints: MissionPoint[];
}

export interface TrustedClientItem {
  id: number;
  title: string;
  logos?: Media[];
}

export interface Homepage {
  id: number;
  documentId: string;
  hero?: HeroComponent;
  stats?: StatComponent[];
  about?: AboutComponent;
  visionMission?: VisionMissionComponent;
  clientsTitle?: string;
  clientsDescription?: string;
  trustedClients?: TrustedClientItem[];
  teamTitle?: string;
  teamDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  initials?: string;
  linkedinUrl?: string;
  photo?: Media;
}

export interface Testimonial {
  id: number;
  documentId: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatar?: Media;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  content: any; // blocks
  coverImage?: Media;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T | null;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface OfficeComponent {
  id: number;
  name: string;
  address: string;
  mapsUrl?: string;
}

export interface Global {
  id: number;
  documentId: string;
  logo?: Media;
  footerDescription?: string;
  copyrightText?: string;
  email?: string;
  phone?: string;
  office?: OfficeComponent[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

