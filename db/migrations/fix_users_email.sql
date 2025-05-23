-- Fix users table to ensure email column exists
ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR;