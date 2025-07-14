import {
  getAllProfiles,
  getProfileById,
  setupProfile,
  updateProfile,
} from "./actions";

export const profile = {
  actions: {
    getAll: getAllProfiles, // Browse all profiles
    getById: getProfileById, // View single profile
    update: updateProfile, // Update own profile
    setupProfile, // My connections
    /*
    sendConnectRequest: sendConnectRequest, // Send 1:1 connection request
    respondToConnectRequest: respondToConnectRequest, // Accept / reject request
    listConnections: getConnectionsList,
    */
    //   listAvailable: getAvailableProfiles, // With matching domain/skills
  },
};
