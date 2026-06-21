import qs from "qs";
import { Homepage, Global, Testimonial, Project, StrapiResponse, TeamMember } from "@/types/strapi";

/**
 * Get full Strapi URL from path
 * @param path Path of the url
 * @returns Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://103.93.134.74:1337"
    }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param path Path of the API route
 * @param urlParamsObject URL params object, will be stringified
 * @param options Fetch options
 * @returns Parsed API call response
 */
export async function fetchAPI<T>(
  path: string,
  urlParamsObject = {},
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  // Merge default and user options
  const mergedOptions: RequestInit = {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true, // encode values, don't encode keys
  });

  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(`Error fetching from ${requestUrl}: ${response.statusText}`);
      throw new Error(`An error occurred please try again`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching API for ${path}:`, error);
    // Return empty data instead of crashing the page if Strapi is down
    return { data: null, meta: {} };
  }
}

/**
 * Get media url from Strapi
 * @param media the media object from strapi
 * @returns the full URL of the media
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  // Return the url directly if it's an absolute url
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise, prefix it with the Strapi URL
  return `${getStrapiURL()}${url}`;
}

export async function getHomepageData() {
  const query = {
    populate: {
      hero: { populate: '*' },
      stats: { populate: '*' }, // Pastikan baris ini menggunakan bintang, bukan spesifik ke 'icon'
      about: { populate: '*' },
      visionMission: {
        populate: {
          missionPoints: { populate: '*' }
        }
      },
      trustedClients: { populate: '*' }
    }
  };

  return fetchAPI<Homepage>('/homepage', query);
}

export async function getGlobalData() {
  const query = {
    populate: {
      logo: { populate: '*' },
      office: { populate: '*' }
    },
  };

  return fetchAPI<Global>('/global', query);
}

export async function getTestimonialsData() {
  const query = {
    populate: '*',
  };

  return fetchAPI<Testimonial[]>('/testimonials', query);
}

export async function getTeamMembersData() {
  const query = {
    populate: {
      photo: {
        populate: '*',
      },
    },
  };

  return fetchAPI<TeamMember[]>('/team-members', query);
}

export async function getProjects() {
  const query = {
    populate: '*',
  };

  return fetchAPI<Project[]>('/projects', query);
}

export async function getProjectBySlug(slug: string) {
  const query = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: '*',
  };

  const response = await fetchAPI<Project[]>('/projects', query);
  if (response.data && response.data.length > 0) {
    return { data: response.data[0] };
  }
  return { data: null };
}
