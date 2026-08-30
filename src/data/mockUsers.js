/**
 * @module mockUsers
 * @description Static mock dataset representing the application's user directory.
 * Each entry models a user profile with nested stats, permissions, activity logs,
 * and active sessions — mirroring the shape expected from a real API response.
 */

/**
 * @typedef {Object} MockUser
 * @property {number} id - Unique numeric identifier.
 * @property {string} name - Full display name.
 * @property {string} email - Contact email address.
 * @property {string} username - Short login handle.
 * @property {string} role - Role label (e.g. "Administrator", "Editor").
 * @property {string} avatar - Two-letter initials used as avatar placeholder.
 * @property {'active'|'inactive'} status - Current account status.
 * @property {string} lastActive - Human-readable relative timestamp.
 * @property {string} joinDate - Formatted account creation date.
 * @property {string} location - City and state.
 * @property {string} timezone - IANA-style timezone label.
 * @property {Array<{label: string, value: string}>} stats - Dashboard stat cards.
 * @property {Array<{label: string, value: string, tone: boolean}>} accountInfo - Account detail rows.
 * @property {Array<{label: string, granted: boolean}>} permissions - Permission flags.
 * @property {Array<{action: string, detail: string, time: string, icon: string, security: boolean}>} activityLog - Recent activity entries.
 * @property {Array<{device: string, browser: string, location: string, active: boolean, lastActive: string, icon: string}>} sessions - Active device sessions.
 */

/** @type {MockUser[]} */
export const mockUsers = [
    {
        id: 1,
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        username: 'sarahchen',
        role: 'Administrator',
        avatar: 'SC',
        status: 'active',
        lastActive: '2m ago',
        joinDate: 'Jan 15, 2024',
        location: 'San Francisco, CA',
        timezone: 'PST (UTC-8)',
        stats: [
            { label: 'Projects', value: '24' },
            { label: 'Tasks Done', value: '147' },
            { label: 'Streak', value: '12 Days' },
            { label: 'Active', value: '2m ago' },
        ],
        accountInfo: [
            { label: 'Last Login', value: '2 minutes ago', tone: false },
            { label: 'Status', value: 'Online', tone: true },
            { label: '2FA', value: 'Enabled', tone: true },
        ],
        permissions: [
            { label: 'Manage Users', granted: true },
            { label: 'View Analytics', granted: true },
            { label: 'Edit Content', granted: true },
            { label: 'Delete Records', granted: true },
            { label: 'System Settings', granted: true },
            { label: 'Billing Access', granted: true },
        ],
        activityLog: [
            { action: 'Logged in', detail: 'Chrome on macOS', time: '2 minutes ago', icon: 'login', security: true },
            { action: 'Changed password', detail: 'Security settings', time: '2 days ago', icon: 'lock', security: true },
        ],
        sessions: [
            { device: 'MacBook Pro', browser: 'Chrome 120', location: 'San Francisco, US', active: true, lastActive: 'Current session', icon: 'desktop' },
        ],
    },
    {
        id: 2,
        name: 'Mike Peters',
        email: 'mike.p@example.com',
        username: 'mikep',
        role: 'Editor',
        avatar: 'MP',
        status: 'active',
        lastActive: '15m ago',
        joinDate: 'Feb 01, 2024',
        location: 'New York, NY',
        timezone: 'EST (UTC-5)',
        stats: [
            { label: 'Projects', value: '14' },
            { label: 'Tasks Done', value: '89' },
            { label: 'Streak', value: '5 Days' },
            { label: 'Active', value: '15m ago' },
        ],
        accountInfo: [
            { label: 'Last Login', value: '15 minutes ago', tone: false },
            { label: 'Status', value: 'Online', tone: true },
            { label: '2FA', value: 'Enabled', tone: true },
        ],
        permissions: [
            { label: 'Manage Users', granted: false },
            { label: 'View Analytics', granted: true },
            { label: 'Edit Content', granted: true },
            { label: 'Delete Records', granted: false },
            { label: 'System Settings', granted: false },
            { label: 'Billing Access', granted: false },
        ],
        activityLog: [
            { action: 'Updated profile', detail: 'Avatar uploaded', time: '15 minutes ago', icon: 'check', security: false },
        ],
        sessions: [
            { device: 'Dell Workstation', browser: 'Edge 121', location: 'New York, US', active: true, lastActive: 'Current session', icon: 'desktop' },
        ],
    },
    {
        id: 3,
        name: 'Lisa Wong',
        email: 'lisa.wong@example.com',
        username: 'lisawong',
        role: 'Viewer',
        avatar: 'LW',
        status: 'active',
        lastActive: '1h ago',
        joinDate: 'Mar 10, 2024',
        location: 'Seattle, WA',
        timezone: 'PST (UTC-8)',
        stats: [
            { label: 'Projects', value: '3' },
            { label: 'Tasks Done', value: '12' },
            { label: 'Streak', value: '1 Day' },
            { label: 'Active', value: '1h ago' },
        ],
        accountInfo: [
            { label: 'Last Login', value: '1 hour ago', tone: false },
            { label: 'Status', value: 'Away', tone: false },
            { label: '2FA', value: 'Disabled', tone: false },
        ],
        permissions: [
            { label: 'Manage Users', granted: false },
            { label: 'View Analytics', granted: true },
            { label: 'Edit Content', granted: false },
            { label: 'Delete Records', granted: false },
            { label: 'System Settings', granted: false },
            { label: 'Billing Access', granted: false },
        ],
        activityLog: [
            { action: 'Logged in', detail: 'Safari on macOS', time: '1 hour ago', icon: 'login', security: true },
        ],
        sessions: [
            { device: 'MacBook Air', browser: 'Safari 17', location: 'Seattle, US', active: true, lastActive: 'Current session', icon: 'desktop' },
        ],
    },
    {
        id: 4,
        name: 'James Miller',
        email: 'j.miller@example.com',
        username: 'jamesm',
        role: 'Moderator',
        avatar: 'JM',
        status: 'inactive',
        lastActive: '2d ago',
        joinDate: 'Apr 05, 2024',
        location: 'Austin, TX',
        timezone: 'CST (UTC-6)',
        stats: [
            { label: 'Projects', value: '8' },
            { label: 'Tasks Done', value: '54' },
            { label: 'Streak', value: '0 Days' },
            { label: 'Active', value: '2d ago' },
        ],
        accountInfo: [
            { label: 'Last Login', value: '2 days ago', tone: false },
            { label: 'Status', value: 'Offline', tone: false },
            { label: '2FA', value: 'Enabled', tone: true },
        ],
        permissions: [
            { label: 'Manage Users', granted: false },
            { label: 'View Analytics', granted: true },
            { label: 'Edit Content', granted: true },
            { label: 'Delete Records', granted: true },
            { label: 'System Settings', granted: false },
            { label: 'Billing Access', granted: false },
        ],
        activityLog: [
            { action: 'Changed password', detail: 'Security settings', time: '2 days ago', icon: 'lock', security: true },
        ],
        sessions: [
            { device: 'Linux Workstation', browser: 'Firefox 122', location: 'Austin, US', active: false, lastActive: '2 days ago', icon: 'desktop' },
        ],
    },
    {
        id: 5,
        name: 'Anna Davis',
        email: 'anna.d@example.com',
        username: 'annadavis',
        role: 'Editor',
        avatar: 'AD',
        status: 'active',
        lastActive: '3h ago',
        joinDate: 'May 20, 2024',
        location: 'Chicago, IL',
        timezone: 'CST (UTC-6)',
        stats: [
            { label: 'Projects', value: '19' },
            { label: 'Tasks Done', value: '112' },
            { label: 'Streak', value: '8 Days' },
            { label: 'Active', value: '3h ago' },
        ],
        accountInfo: [
            { label: 'Last Login', value: '3 hours ago', tone: false },
            { label: 'Status', value: 'Online', tone: true },
            { label: '2FA', value: 'Enabled', tone: true },
        ],
        permissions: [
            { label: 'Manage Users', granted: false },
            { label: 'View Analytics', granted: true },
            { label: 'Edit Content', granted: true },
            { label: 'Delete Records', granted: false },
            { label: 'System Settings', granted: false },
            { label: 'Billing Access', granted: true },
        ],
        activityLog: [
            { action: 'Completed task "Asset Export"', detail: 'Project: Branding', time: '3 hours ago', icon: 'check', security: false },
        ],
        sessions: [
            { device: 'Samsung Galaxy S23', browser: 'Chrome Mobile', location: 'Chicago, US', active: true, lastActive: 'Current session', icon: 'mobile' },
        ],
    },
]