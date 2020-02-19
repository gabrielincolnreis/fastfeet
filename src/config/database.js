module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet2',
  define: {
    timestamps: true, // permite o updated_at
    underscored: true,
    underscoredAll: true,
  },
};
