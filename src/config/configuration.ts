export default () => ({
  supabase: {
    jwtSecret: process.env.SUPABASE_JWT_SECRET,
  },
});
