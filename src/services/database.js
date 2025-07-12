import initSqlJs from 'sql.js';

class DatabaseService {
  constructor() {
    this.db = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      const SQL = await initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
      });

      // Check if database exists in localStorage
      const savedDb = localStorage.getItem('skillSwapperDB');
      if (savedDb) {
        const uInt8Array = new Uint8Array(JSON.parse(savedDb));
        this.db = new SQL.Database(uInt8Array);
      } else {
        this.db = new SQL.Database();
        await this.createTables();
        await this.insertSampleData();
      }

      this.isInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  async createTables() {
    const createUsersTable = `
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        location TEXT,
        profile_photo TEXT,
        bio TEXT,
        rating REAL DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        availability TEXT,
        response_time TEXT,
        is_online BOOLEAN DEFAULT 0,
        last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
        distance REAL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createSkillsTable = `
      CREATE TABLE skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createUserSkillsTable = `
      CREATE TABLE user_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        skill_id INTEGER,
        type TEXT CHECK(type IN ('offered', 'wanted')),
        proficiency_level INTEGER DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE,
        UNIQUE(user_id, skill_id, type)
      )
    `;

    const createSwapRequestsTable = `
      CREATE TABLE swap_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        requester_id INTEGER,
        requestee_id INTEGER,
        offered_skill_id INTEGER,
        wanted_skill_id INTEGER,
        message TEXT,
        status TEXT CHECK(status IN ('pending', 'accepted', 'rejected', 'completed')) DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (requester_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (requestee_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (offered_skill_id) REFERENCES skills (id),
        FOREIGN KEY (wanted_skill_id) REFERENCES skills (id)
      )
    `;

    const createActiveSwapsTable = `
      CREATE TABLE active_swaps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id INTEGER,
        user1_id INTEGER,
        user2_id INTEGER,
        user1_skill_id INTEGER,
        user2_skill_id INTEGER,
        status TEXT CHECK(status IN ('scheduled', 'pending_schedule', 'in_progress', 'completed')) DEFAULT 'pending_schedule',
        next_session DATETIME,
        total_sessions INTEGER DEFAULT 0,
        completed_sessions INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (request_id) REFERENCES swap_requests (id) ON DELETE CASCADE,
        FOREIGN KEY (user1_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (user2_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (user1_skill_id) REFERENCES skills (id),
        FOREIGN KEY (user2_skill_id) REFERENCES skills (id)
      )
    `;

    const createActivitiesTable = `
      CREATE TABLE activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        type TEXT NOT NULL,
        message TEXT NOT NULL,
        related_user_id INTEGER,
        related_user_name TEXT,
        related_user_avatar TEXT,
        is_new BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `;

    this.db.run(createUsersTable);
    this.db.run(createSkillsTable);
    this.db.run(createUserSkillsTable);
    this.db.run(createSwapRequestsTable);
    this.db.run(createActiveSwapsTable);
    this.db.run(createActivitiesTable);

    this.saveDatabase();
  }

  async insertSampleData() {
    // Insert sample skills
    const skills = [
      'React', 'JavaScript', 'Python', 'UI/UX Design', 'Figma', 'Data Science',
      'Machine Learning', 'Web Development', 'Digital Marketing', 'SQL', 'Excel',
      'Data Analysis', 'Spanish', 'Photography', 'Adobe Lightroom', 'Travel Planning',
      'Video Editing', 'Social Media Marketing', 'Graphic Design', 'Node.js', 'MongoDB',
      'AWS', 'DevOps', 'Mobile Development', 'Flutter', 'iOS Development', 'SEO',
      'Content Writing', 'Google Analytics', 'Photoshop', 'Brand Strategy',
      'Project Management', 'Agile', 'Leadership', 'Public Speaking', 'Data Visualization',
      'Tableau', 'Business Intelligence', 'Illustrator', 'Branding', 'Logo Design',
      'CSS', 'Animation', 'Music Production', 'Guitar', 'Audio Engineering',
      'Logic Pro', 'Video Production', 'Final Cut Pro', 'Cinematography'
    ];

    skills.forEach(skill => {
      this.db.run('INSERT INTO skills (name) VALUES (?)', [skill]);
    });

    // Insert sample users
    const sampleUsers = [
      {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        location: "San Francisco, CA",
        profile_photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        bio: "Full-stack developer passionate about React and Python. Love teaching and learning new technologies.",
        rating: 4.8,
        review_count: 24,
        availability: "Weekday Evenings",
        response_time: "Usually responds in 2 hours",
        is_online: 1,
        distance: 0
      },
      {
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        location: "San Francisco, CA",
        profile_photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        bio: "UI/UX designer with a passion for creating beautiful and functional interfaces.",
        rating: 4.8,
        review_count: 24,
        availability: "Weekday Evenings",
        response_time: "Usually responds in 2 hours",
        is_online: 1,
        distance: 2.5
      },
      {
        name: "Marcus Johnson",
        email: "marcus.johnson@example.com",
        location: "Austin, TX",
        profile_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        bio: "Data analyst with expertise in Python and SQL. Always eager to share knowledge.",
        rating: 4.6,
        review_count: 18,
        availability: "Weekend Mornings",
        response_time: "Usually responds in 4 hours",
        is_online: 0,
        distance: 1.2
      },
      {
        name: "Elena Rodriguez",
        email: "elena.rodriguez@example.com",
        location: "Miami, FL",
        profile_photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        bio: "Photographer and language enthusiast. Love teaching Spanish and photography techniques.",
        rating: 4.9,
        review_count: 31,
        availability: "Flexible Schedule",
        response_time: "Usually responds in 1 hour",
        is_online: 1,
        distance: 5.8
      },
      {
        name: "David Kim",
        email: "david.kim@example.com",
        location: "Seattle, WA",
        profile_photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        bio: "Backend developer specializing in Node.js and cloud technologies.",
        rating: 4.7,
        review_count: 22,
        availability: "Weekday Afternoons",
        response_time: "Usually responds in 3 hours",
        is_online: 1,
        distance: 3.1
      }
    ];

    sampleUsers.forEach((user, index) => {
      this.db.run(`
        INSERT INTO users (name, email, location, profile_photo, bio, rating, review_count, availability, response_time, is_online, distance)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [user.name, user.email, user.location, user.profile_photo, user.bio, user.rating, user.review_count, user.availability, user.response_time, user.is_online, user.distance]);
    });

    // Insert user skills
    const userSkillsData = [
      { userId: 1, skills: { offered: ['React', 'JavaScript', 'Python'], wanted: ['UI/UX Design', 'Data Science'] } },
      { userId: 2, skills: { offered: ['React', 'JavaScript', 'UI/UX Design', 'Figma'], wanted: ['Python', 'Data Science', 'Machine Learning'] } },
      { userId: 3, skills: { offered: ['Python', 'Data Analysis', 'SQL', 'Excel'], wanted: ['Web Development', 'React', 'Digital Marketing'] } },
      { userId: 4, skills: { offered: ['Spanish', 'Photography', 'Adobe Lightroom', 'Travel Planning'], wanted: ['Video Editing', 'Social Media Marketing', 'Graphic Design'] } },
      { userId: 5, skills: { offered: ['Node.js', 'MongoDB', 'AWS', 'DevOps'], wanted: ['Mobile Development', 'Flutter', 'iOS Development'] } }
    ];

    userSkillsData.forEach(userData => {
      ['offered', 'wanted'].forEach(type => {
        userData.skills[type].forEach(skillName => {
          const skillResult = this.db.exec('SELECT id FROM skills WHERE name = ?', [skillName]);
          if (skillResult.length > 0) {
            const skillId = skillResult[0].values[0][0];
            this.db.run('INSERT INTO user_skills (user_id, skill_id, type) VALUES (?, ?, ?)', [userData.userId, skillId, type]);
          }
        });
      });
    });

    // Insert sample activities for user 1 (Alex Johnson)
    const sampleActivities = [
      {
        user_id: 1,
        type: "request_received",
        message: "New swap request from David Kim for JavaScript tutoring",
        related_user_id: 5,
        related_user_name: "David Kim",
        related_user_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        is_new: 1
      },
      {
        user_id: 1,
        type: "request_accepted",
        message: "Lisa Thompson accepted your request for Graphic Design lessons",
        related_user_id: 2,
        related_user_name: "Lisa Thompson",
        related_user_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        is_new: 1
      }
    ];

    sampleActivities.forEach(activity => {
      this.db.run(`
        INSERT INTO activities (user_id, type, message, related_user_id, related_user_name, related_user_avatar, is_new)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [activity.user_id, activity.type, activity.message, activity.related_user_id, activity.related_user_name, activity.related_user_avatar, activity.is_new]);
    });

    this.saveDatabase();
  }

  saveDatabase() {
    if (this.db) {
      const data = this.db.export();
      localStorage.setItem('skillSwapperDB', JSON.stringify(Array.from(data)));
    }
  }

  // User operations
  async getAllUsers() {
    await this.initialize();
    const result = this.db.exec(`
      SELECT u.*, 
             GROUP_CONCAT(CASE WHEN us.type = 'offered' THEN s.name END) as skills_offered,
             GROUP_CONCAT(CASE WHEN us.type = 'wanted' THEN s.name END) as skills_wanted
      FROM users u
      LEFT JOIN user_skills us ON u.id = us.user_id
      LEFT JOIN skills s ON us.skill_id = s.id
      WHERE u.id != 1
      GROUP BY u.id
      ORDER BY u.rating DESC, u.is_online DESC
    `);

    if (result.length > 0) {
      return result[0].values.map(row => ({
        id: row[0],
        name: row[1],
        email: row[2],
        location: row[3],
        profile_photo: row[4],
        bio: row[5],
        rating: row[6],
        review_count: row[7],
        availability: row[8],
        response_time: row[9],
        is_online: Boolean(row[10]),
        last_active: row[11],
        distance: row[12],
        skillsOffered: row[15] ? row[15].split(',') : [],
        skillsWanted: row[16] ? row[16].split(',') : []
      }));
    }
    return [];
  }

  async getCurrentUser() {
    await this.initialize();
    const result = this.db.exec('SELECT * FROM users WHERE id = 1');
    if (result.length > 0 && result[0].values.length > 0) {
      const row = result[0].values[0];
      return {
        id: row[0],
        name: row[1],
        email: row[2],
        location: row[3],
        profile_photo: row[4],
        bio: row[5],
        rating: row[6],
        review_count: row[7],
        availability: row[8],
        response_time: row[9],
        is_online: Boolean(row[10])
      };
    }
    return null;
  }

  async getUserActivities(userId = 1) {
    await this.initialize();
    const result = this.db.exec(`
      SELECT * FROM activities 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT 10
    `, [userId]);

    if (result.length > 0) {
      return result[0].values.map(row => ({
        id: row[0],
        type: row[2],
        message: row[3],
        timestamp: new Date(row[7]),
        userName: row[5],
        userAvatar: row[6],
        isNew: Boolean(row[7])
      }));
    }
    return [];
  }

  async getDashboardStats(userId = 1) {
    await this.initialize();
    
    // Get pending requests count
    const pendingRequestsResult = this.db.exec(`
      SELECT 
        COUNT(CASE WHEN requester_id = ? THEN 1 END) as sent,
        COUNT(CASE WHEN requestee_id = ? THEN 1 END) as received
      FROM swap_requests 
      WHERE status = 'pending' AND (requester_id = ? OR requestee_id = ?)
    `, [userId, userId, userId, userId]);

    // Get active swaps
    const activeSwapsResult = this.db.exec(`
      SELECT 
        s.id,
        CASE WHEN s.user1_id = ? THEN s.user2_id ELSE s.user1_id END as partner_id,
        u.name as partner_name,
        u.profile_photo as partner_avatar,
        sk1.name as your_skill,
        sk2.name as their_skill,
        s.status,
        s.next_session
      FROM active_swaps s
      JOIN users u ON (CASE WHEN s.user1_id = ? THEN s.user2_id ELSE s.user1_id END = u.id)
      JOIN skills sk1 ON (CASE WHEN s.user1_id = ? THEN s.user1_skill_id ELSE s.user2_skill_id END = sk1.id)
      JOIN skills sk2 ON (CASE WHEN s.user1_id = ? THEN s.user2_skill_id ELSE s.user1_skill_id END = sk2.id)
      WHERE s.user1_id = ? OR s.user2_id = ?
      ORDER BY s.next_session ASC
    `, [userId, userId, userId, userId, userId, userId]);

    const pendingRequests = pendingRequestsResult.length > 0 ? {
      sent: pendingRequestsResult[0].values[0][0] || 0,
      received: pendingRequestsResult[0].values[0][1] || 0
    } : { sent: 0, received: 0 };

    const activeSwaps = activeSwapsResult.length > 0 ? 
      activeSwapsResult[0].values.map(row => ({
        id: row[0],
        partnerId: `user_${row[1]}`,
        partnerName: row[2],
        partnerAvatar: row[3],
        yourSkill: row[4],
        theirSkill: row[5],
        status: row[6],
        nextSession: row[7],
        rating: 4.8 // Mock rating for now
      })) : [];

    return {
      pendingRequests,
      activeSwaps,
      stats: {
        totalSwaps: 24,
        skillsTaught: 8,
        skillsLearned: 12,
        averageRating: 4.8,
        memberSince: "March 2024",
        lastActive: "2 minutes ago"
      }
    };
  }

  async searchUsers(query, filters = {}) {
    await this.initialize();
    let sql = `
      SELECT DISTINCT u.*, 
             GROUP_CONCAT(CASE WHEN us.type = 'offered' THEN s.name END) as skills_offered,
             GROUP_CONCAT(CASE WHEN us.type = 'wanted' THEN s.name END) as skills_wanted
      FROM users u
      LEFT JOIN user_skills us ON u.id = us.user_id
      LEFT JOIN skills s ON us.skill_id = s.id
      WHERE u.id != 1
    `;

    const params = [];

    if (query?.trim()) {
      sql += ` AND (u.name LIKE ? OR u.location LIKE ? OR s.name LIKE ?)`;
      const searchTerm = `%${query.trim()}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (filters.location) {
      sql += ` AND u.location LIKE ?`;
      params.push(`%${filters.location}%`);
    }

    if (filters.availability) {
      sql += ` AND u.availability = ?`;
      params.push(filters.availability);
    }

    if (filters.minRating > 0) {
      sql += ` AND u.rating >= ?`;
      params.push(filters.minRating);
    }

    sql += ` GROUP BY u.id ORDER BY u.rating DESC, u.is_online DESC`;

    const result = this.db.exec(sql, params);

    if (result.length > 0) {
      return result[0].values.map(row => ({
        id: row[0],
        name: row[1],
        email: row[2],
        location: row[3],
        profile_photo: row[4],
        bio: row[5],
        rating: row[6],
        review_count: row[7],
        availability: row[8],
        response_time: row[9],
        is_online: Boolean(row[10]),
        last_active: row[11],
        distance: row[12],
        skillsOffered: row[15] ? row[15].split(',') : [],
        skillsWanted: row[16] ? row[16].split(',') : []
      }));
    }
    return [];
  }

  async createSwapRequest(requestData) {
    await this.initialize();
    
    const { requesterId, requesteeId, offeredSkillName, wantedSkillName, message } = requestData;
    
    // Get skill IDs
    const offeredSkillResult = this.db.exec('SELECT id FROM skills WHERE name = ?', [offeredSkillName]);
    const wantedSkillResult = this.db.exec('SELECT id FROM skills WHERE name = ?', [wantedSkillName]);
    
    if (offeredSkillResult.length === 0 || wantedSkillResult.length === 0) {
      throw new Error('Skills not found');
    }
    
    const offeredSkillId = offeredSkillResult[0].values[0][0];
    const wantedSkillId = wantedSkillResult[0].values[0][0];
    
    this.db.run(`
      INSERT INTO swap_requests (requester_id, requestee_id, offered_skill_id, wanted_skill_id, message)
      VALUES (?, ?, ?, ?, ?)
    `, [requesterId, requesteeId, offeredSkillId, wantedSkillId, message]);
    
    this.saveDatabase();
    return true;
  }

  async addActivity(activityData) {
    await this.initialize();
    
    const { userId, type, message, relatedUserId, relatedUserName, relatedUserAvatar } = activityData;
    
    this.db.run(`
      INSERT INTO activities (user_id, type, message, related_user_id, related_user_name, related_user_avatar)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [userId, type, message, relatedUserId, relatedUserName, relatedUserAvatar]);
    
    this.saveDatabase();
  }
}

export default new DatabaseService();