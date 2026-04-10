/**
 * Represents a site with its details, including location, status, and timezone.
 *
 * @interface Site
 */
export interface Site {
  /**
   * The unique identifier of the site. It can be a string, a number, or null if the site doesn't have an ID.
   *
   * @type {string | number | null}
   */
  id: string | number | null;

  /**
   * The name of the site.
   *
   * @type {string}
   */
  name: string;

  /**
   * The location of the site, typically a city or region.
   *
   * @type {string}
   */
  location: string;

  /**
   * The status of the site. It can either be 'active' or 'inactive'.
   *
   * @type {"active" | "inactive"}
   */
  status: "active" | "inactive";

  /**
   * The timezone of the site. This property is optional.
   *
   * @type {string | undefined}
   */
  timezone?: string;
}

/**
 * Represents timezone information for a specific country and region.
 *
 * @interface Timezone
 */
export interface Timezone {
  /**
   * The country code (ISO 3166-1 alpha-2 format).
   *
   * @type {string}
   */
  countryCode: string;

  /**
   * The full name of the country.
   *
   * @type {string}
   */
  countryName: string;

  /**
   * The name of the timezone, such as 'Eastern Standard Time' or 'Central European Time'.
   *
   * @type {string}
   */
  zoneName: string;

  /**
   * The GMT offset for the timezone, represented as a string in the format '+hh:mm' or '-hh:mm'.
   *
   * @type {string}
   */
  gmtOffset: string;

  /**
   * The current timestamp for the timezone, typically in ISO 8601 format.
   *
   * @type {string}
   */
  timestamp: string;
}
