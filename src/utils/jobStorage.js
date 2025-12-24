// Job Storage Utility Functions
// Manages job data in localStorage for Java, UI, and Logic features

const STORAGE_KEYS = {
    java: 'knowlearn_java_jobs',
    ui: 'knowlearn_ui_jobs',
    logic: 'knowlearn_logic_jobs'
};

const FEATURE_NAMES = {
    java: 'Java 변환 작업',
    ui: 'UI 현대화 작업',
    logic: '로직 마이그레이션 작업'
};

/**
 * Generate job name with current timestamp
 * @param {string} feature - 'java', 'ui', or 'logic'
 * @returns {string} Generated job name
 */
export function generateJobName(feature) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const featureName = FEATURE_NAMES[feature] || 'Unknown';
    return `${featureName}_${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * Save job data to localStorage
 * @param {string} feature - 'java', 'ui', or 'logic'
 * @param {object} jobData - Job data object
 */
export function saveJob(feature, jobData) {
    const key = STORAGE_KEYS[feature];
    if (!key) {
        console.error('Invalid feature:', feature);
        return;
    }

    const jobs = getJobs(feature);
    const newJob = {
        id: Date.now(),
        ...jobData,
        createdAt: new Date().toISOString()
    };

    jobs.unshift(newJob); // Add to beginning
    localStorage.setItem(key, JSON.stringify(jobs));

    return newJob;
}

/**
 * Get all jobs for a feature
 * @param {string} feature - 'java', 'ui', or 'logic'
 * @returns {array} Array of job objects
 */
export function getJobs(feature) {
    const key = STORAGE_KEYS[feature];
    if (!key) {
        console.error('Invalid feature:', feature);
        return [];
    }

    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading jobs:', error);
        return [];
    }
}

/**
 * Get specific job by ID
 * @param {string} feature - 'java', 'ui', or 'logic'
 * @param {number} id - Job ID
 * @returns {object|null} Job object or null
 */
export function getJobById(feature, id) {
    const jobs = getJobs(feature);
    return jobs.find(job => job.id === id) || null;
}

/**
 * Delete job by ID
 * @param {string} feature - 'java', 'ui', or 'logic'
 * @param {number} id - Job ID
 */
export function deleteJob(feature, id) {
    const key = STORAGE_KEYS[feature];
    if (!key) {
        console.error('Invalid feature:', feature);
        return;
    }

    const jobs = getJobs(feature);
    const filteredJobs = jobs.filter(job => job.id !== id);
    localStorage.setItem(key, JSON.stringify(filteredJobs));
}

/**
 * Clear all jobs for a feature
 * @param {string} feature - 'java', 'ui', or 'logic'
 */
export function clearJobs(feature) {
    const key = STORAGE_KEYS[feature];
    if (!key) {
        console.error('Invalid feature:', feature);
        return;
    }

    localStorage.removeItem(key);
}
