// Database Connection Test Script
// Run with: npm run test-db

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function testConnection() {
  console.log('🔍 Testing database connection...\n')
  
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Successfully connected to database!')
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Query test successful:', result)
    
    console.log('\n📊 Database info:')
    console.log('- Provider: MySQL')
    console.log('- Database:', process.env.DATABASE_URL?.split('/').pop()?.split('?')[0])
    console.log('- Host:', process.env.DATABASE_URL?.split('@')[1]?.split('/')[0])
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    if (error instanceof Error) {
      console.error('Error:', error.message)
      
      // Provide helpful error messages
      if (error.message.includes('Can\'t reach database server')) {
        console.log('\n💡 Possible solutions:')
        console.log('1. Enable remote MySQL access in Bluehost cPanel')
        console.log('2. Check if your IP is whitelisted')
        console.log('3. Verify database credentials')
      } else if (error.message.includes('Access denied')) {
        console.log('\n💡 Possible solutions:')
        console.log('1. Verify database username and password')
        console.log('2. Check if user has proper permissions')
      } else if (error.message.includes('Unknown database')) {
        console.log('\n💡 Possible solutions:')
        console.log('1. Verify database name is correct')
        console.log('2. Create the database in phpMyAdmin')
      }
    }
  } finally {
    await prisma.$disconnect()
    console.log('\n✅ Disconnected from database')
  }
}

testConnection()
  .catch((error) => {
    console.error('Unexpected error:', error)
    process.exit(1)
  })
