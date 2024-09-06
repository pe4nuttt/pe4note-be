export default () => ({
  app: {
    port: process.env.APP_PORT,
  },
  supabase: {
    jwtSecret: process.env.SUPABASE_JWT_SECRET,
  },
});
