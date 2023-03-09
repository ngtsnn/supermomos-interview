import type { Social, SocialError } from "@interfaces/social";
import httpInstance from "@utils/http";

class SocialService {
  constructor() {
    //
  }

  async createSocial(social: Social) {
    return await httpInstance.post("/api/socials", social);
  }
}

export const validateSocial = (social: Social): SocialError => {
  const err: SocialError = {};
  if (!social.title) {
    err.title = "Title is required";
  }
  if (!social.startAt) {
    err.startAt = "Start time is required";
  }
  if (!social.banner) {
    err.banner = "Banner is required";
  }
  if (isNaN(social.capacity) || social.capacity == 0) {
    err.capacity = "Capacity must be greater than 0";
  }
  if (!social.venue) {
    err.venue = "Venue is required";
  }
  if (isNaN(+social.price) || social.price == 0) {
    err.price = "Price must be greater than 0";
  }
  if (!social.description) {
    err.description = "Description is required";
  }
  if (!social.privacy) {
    err.privacy = "Please choose the privacy";
  }

  return err;
};

export default new SocialService();
