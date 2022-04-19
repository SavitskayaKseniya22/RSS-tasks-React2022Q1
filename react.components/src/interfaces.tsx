export interface MainPageType {
  value: string;
  response: SearchItemDetailType[];
  isDownloading: boolean;
  isSearchOver: boolean;
  isError: boolean;
}

export interface SearchItemType {
  item: SearchItemDetailType;
}

export interface SearchItemDetailType {
  src: string | null;
  description: string | null;
  author: string | null;
  link: string | null;
  height: number | null;
  width: number | null;
  portfolio: string | null;
  location: string | null;
  likes: number | null;
  unsplashLink: string | null;
}

export interface SearchInputState {
  value: string;
}

export interface SearchInputProps {
  value: string;
  handleChange: (value: string) => void;
  handleDownload: (response: SearchItemDetailType[], load: boolean, error?: boolean) => void;
}

export interface ResponseType {
  total: number;
  total_pages: number;
  results: ResponseItemType[];
}

export interface ResponseItemType {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string | null;
  blur_hash: string | null;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string | null;
    full: string | null;
    regular: string | null;
    small: string | null;
    thumb: string | null;
    small_s3: string | null;
  };
  links: {
    self: string | null;
    html: string | null;
    download: string | null;
    download_location: string | null;
  };
  categories: string[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: string | null;
  topic_submissions: `Record<string, never>`;
  user: {
    id: string | null;
    updated_at: string | null;
    username: string | null;
    name: string | null;
    first_name: string | null;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string | null;
      html: string | null;
      photos: string | null;
      likes: string | null;
      portfolio: string | null;
      following: string | null;
      followers: string | null;
    };
    profile_image: {
      small: string | null;
      medium: string | null;
      large: string | null;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string | null;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email: string | null;
    };
  };
  tags: string[];
}

export interface CardListProps {
  savedCards: CardProps[];
}

export interface CardProps {
  adress?: string;
  title: string;
  description: string;
  link?: string;
  email: string;
  phone: string;
  price: string;
  date: string;
  area: string;
  typeAdd: string;
  isReady: boolean;
  currency: string;
  img: string;
}

export interface FormStateTypes {
  isValidTitle: null | boolean;
  isValidDescription: null | boolean;
  isValidTel: null | boolean;
  isValidEmail: null | boolean;
  isValidArea: null | boolean;
  isValidPrice: null | boolean;
  isValidDate: null | boolean;
  isValidFile: null | boolean;
  savedCards: CardProps[];
  isSubmitBlock: boolean;
  isErrorsOpen: boolean;
}
