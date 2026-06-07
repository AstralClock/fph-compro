import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_abouts';
  info: {
    displayName: 'about';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    headline: Schema.Attribute.String;
    subtext: Schema.Attribute.Text;
    tagline: Schema.Attribute.String;
  };
}

export interface SectionsMissionItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_mission_items';
  info: {
    displayName: 'mission-item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SectionsTrustedClients extends Struct.ComponentSchema {
  collectionName: 'components_sections_trusted_clients';
  info: {
    displayName: 'trusted-clients';
  };
  attributes: {
    logos: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsVisionMission extends Struct.ComponentSchema {
  collectionName: 'components_sections_vision_missions';
  info: {
    displayName: 'vision-mission';
  };
  attributes: {
    missionPoints: Schema.Attribute.Component<'sections.mission-item', true>;
    visionText: Schema.Attribute.Text;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedOfficeLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_office_locations';
  info: {
    displayName: 'officeLocation';
  };
  attributes: {
    address: Schema.Attribute.Text;
    mapsUrl: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    displayName: 'stat-item';
  };
  attributes: {
    iconName: Schema.Attribute.Enumeration<
      ['Users', 'Calendar', 'Briefcase', 'Award', 'Building2', 'Smile']
    >;
    label: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.about': SectionsAbout;
      'sections.hero': SectionsHero;
      'sections.mission-item': SectionsMissionItem;
      'sections.trusted-clients': SectionsTrustedClients;
      'sections.vision-mission': SectionsVisionMission;
      'shared.link': SharedLink;
      'shared.office-location': SharedOfficeLocation;
      'shared.stat-item': SharedStatItem;
    }
  }
}
