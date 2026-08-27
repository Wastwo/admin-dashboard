import { ref } from "vue";

const users = ref([
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
        lastLogin: '2 minutes ago',
        location: 'San Francisco, CA',
        timezone: 'PST (UTC-8)',
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
        lastLogin: '15 minutes ago',
        location: 'New York, NY',
        timezone: 'EST (UTC-5)',
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
        lastLogin: '1 hour ago',
        location: 'Seattle, WA',
        timezone: 'PST (UTC-8)',
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
        lastLogin: '2 days ago',
        location: 'Austin, TX',
        timezone: 'CST (UTC-6)',
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
        lastLogin: '3 hours ago',
        location: 'Chicago, IL',
        timezone: 'CST (UTC-6)',
    },
]);

export function useUsers() {
    const getUserById = (rawId) => {
        if (rawId === null || rawId === undefined || rawId === '') return;

        const id = Number(rawId);
        if (Number.isNaN(id)) return;

        return users.value.find((user) => user.id === id);
    };
    return {
        users,
        getUserById
    }
}