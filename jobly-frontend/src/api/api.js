import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** get tokem for signed up user */

  static async signup(userData) {
    let res = await this.request("auth/register", userData, "post");
    return res.token;
  }

  /** get token for logged in user */

  static async login(userData) {
    let res = await this.request("auth/token",  userData, "post");
    return res.token;
  }

  /** get current user */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** update profile */

  static async updateProfile(username, newData) {
    let res = await this.request(`users/${username}`, newData, "patch");
    return res.user;
  }

  /** Get all companies / or filter by handle. */

  static async getCompanies(name) {
    let res = await this.request("companies", {name});
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all jobs / or filter by title. */

  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }


  /** Get job by id. */

  static async getJobById(id) {
    let res = await this.request(`jobs/${id}`, { id });
    return res.job;
  }

  /** A user applies to a job */

  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }

  /** A user applies to a job */

  static async unApplyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "delete");
    return res.deleted;
  }

}

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;