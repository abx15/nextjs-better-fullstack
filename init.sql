-- PostgreSQL initialization script for SarkariSaathi
-- This script runs when the database container starts

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS sarkarisaathi;

-- Connect to the database
\c sarkarisaathi;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create basic schema structure
-- Note: Prisma will handle the actual schema creation during migration

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE sarkarisaathi TO postgres;

-- Create indexes for better search performance (will be created by Prisma)
-- These are placeholders for reference

-- Log initialization
SELECT 'Database initialized successfully' as message;
