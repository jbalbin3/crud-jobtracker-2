import ApiCore from './core.js';

const url = 'jobs';
const plural = 'jobs';
const single = 'job';

const apiJobs = new ApiCore({
  getAll: true,
  getSingle: false,
  post: true,
  put: true,
  remove: true,
  removeAll: true,
  url: url,
  plural: plural,
  single: single
});

export default apiJobs;