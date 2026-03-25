/* ======================================================
   RUPEES RADAR — Supabase Client Configuration (Custom Auth Table)
   Project: wvbjmxkqxqyjmmiwtasu
   ====================================================== */

console.log("Loading supabase.js...");

const SUPABASE_URL = 'https://wvbjmxkqxqyjmmiwtasu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Aha_hQu8gO2mtTC5CFgThw_rtPScr-B';

// Initialize Supabase client
let supabase = null;
try {
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Supabase client initialized successfully.");
    } else {
        console.warn("Supabase CDN script not loaded, fallback to null.");
    }
} catch (e) {
    console.error("Failed to initialize Supabase client:", e);
}

// ── Custom Auth Helpers (using app_users table directly) ────
window.Auth = {
    async signUp(email, password, name, business) {
        if (!supabase) return { error: { message: 'Supabase library failed to load (Check adblocker or Connection)' } };
        try {
            // Check if user exists
            const { data: existing, error: err1 } = await supabase
                .from('app_users')
                .select('id')
                .eq('email', email)
                .maybeSingle();

            if (err1 && err1.code !== 'PGRST116') {
                return { error: err1 };
            }
            if (existing) {
                return { error: { message: 'User already exists globally' } };
            }

            const { data, error } = await supabase.from('app_users').insert([{
                email,
                password,
                name,
                business
            }]).select().single();

            if (error) return { error };
            if (data) {
                localStorage.setItem('sb_custom_user', JSON.stringify(data));
            }
            return { data, error: null };
        } catch (err) {
            return { error: { message: err.message } };
        }
    },

    async signIn(email, password) {
        if (!supabase) return { error: { message: 'Supabase library failed to load (Check adblocker or Connection)' } };
        try {
            const { data, error } = await supabase.from('app_users')
                .select('*')
                .eq('email', email)
                .eq('password', password)
                .maybeSingle();

            if (error && error.code !== 'PGRST116') return { error };

            if (data) {
                localStorage.setItem('sb_custom_user', JSON.stringify(data));
                return { data, error: null };
            } else {
                return { data: null, error: { message: 'Invalid email or password' } };
            }
        } catch (err) {
            return { error: { message: err.message } };
        }
    },

    signOut() {
        localStorage.removeItem('sb_custom_user');
        window.location.href = 'index.html';
    },

    getUser() {
        try {
            const u = localStorage.getItem('sb_custom_user');
            return u ? JSON.parse(u) : null;
        } catch (e) {
            return null;
        }
    },

    // Check if user is logged in, redirect to login if not
    requireAuth() {
        const user = this.getUser();
        if (!user) {
            window.location.href = 'index.html';
            return null;
        }
        return user;
    }
};

// ── Supabase Database Helpers ─────────────────────────
window.DB = {
    // ── Profile / App Users ──
    async getProfile() {
        const user = window.Auth.getUser();
        if (!user) return null;
        const { data } = await supabase.from('app_users').select('*').eq('id', user.id).single();
        return data;
    },

    async updateProfile(updates) {
        const user = window.Auth.getUser();
        if (!user) return null;
        const { data, error } = await supabase.from('app_users').update(updates).eq('id', user.id).select().single();
        if (data) {
            localStorage.setItem('sb_custom_user', JSON.stringify(data));
        }
        return { data, error };
    },

    // ── Students ──
    async getStudents() {
        const user = window.Auth.getUser();
        if (!user) return [];
        const { data } = await supabase.from('students').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        return data || [];
    },

    async addStudent(student) {
        const user = window.Auth.getUser();
        if (!user) return null;
        const { data, error } = await supabase.from('students').insert({ ...student, user_id: user.id }).select().single();
        return { data, error };
    },

    async updateStudent(id, updates) {
        const { data, error } = await supabase.from('students').update(updates).eq('id', id).select().single();
        return { data, error };
    },

    async deleteStudent(id) {
        const { error } = await supabase.from('students').delete().eq('id', id);
        return { error };
    },

    // ── Teachers ──
    async getTeachers() {
        const user = window.Auth.getUser();
        if (!user) return [];
        const { data } = await supabase.from('teachers').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        return data || [];
    },

    async addTeacher(teacher) {
        const user = window.Auth.getUser();
        if (!user) return null;
        const { data, error } = await supabase.from('teachers').insert({ ...teacher, user_id: user.id }).select().single();
        return { data, error };
    },

    async updateTeacher(id, updates) {
        const { data, error } = await supabase.from('teachers').update(updates).eq('id', id).select().single();
        return { data, error };
    },

    async deleteTeacher(id) {
        const { error } = await supabase.from('teachers').delete().eq('id', id);
        return { error };
    },

    // ── Expenses ──
    async getExpenses() {
        const user = window.Auth.getUser();
        if (!user) return [];
        const { data } = await supabase.from('expenses').select('*').eq('user_id', user.id).order('expense_date', { ascending: false });
        return data || [];
    },

    async addExpense(expense) {
        const user = window.Auth.getUser();
        if (!user) return null;
        const { data, error } = await supabase.from('expenses').insert({ ...expense, user_id: user.id }).select().single();
        return { data, error };
    },

    async updateExpense(id, updates) {
        const { data, error } = await supabase.from('expenses').update(updates).eq('id', id).select().single();
        return { data, error };
    },

    async deleteExpense(id) {
        const { error } = await supabase.from('expenses').delete().eq('id', id);
        return { error };
    },

    // ── Settings ──
    async getSettings() {
        const user = window.Auth.getUser();
        if (!user) return null;
        const { data } = await supabase.from('settings').select('*').eq('id', user.id).single();
        return data;
    },

    async updateSettings(updates) {
        const user = window.Auth.getUser();
        if (!user) return null;
        const { data, error } = await supabase.from('settings').update(updates).eq('id', user.id).select().single();
        return { data, error };
    },

    // ── Transactions ──
    async getTransactions(limit = 10) {
        const user = window.Auth.getUser();
        if (!user) return [];
        const { data } = await supabase.from('transactions').select('*').eq('user_id', user.id).order('transaction_date', { ascending: false }).limit(limit);
        return data || [];
    }
};

console.log("Auth and DB successfully bound to window.");
