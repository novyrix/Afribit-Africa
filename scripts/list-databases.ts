// List all databases on the server
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function listDatabases() {
  console.log('🔍 Checking database server...\n')
  
  try {
    await prisma.$connect()
    console.log('✅ Connected to MySQL server!')
    
    // List all databases
    const databases = await prisma.$queryRaw`SHOW DATABASES`
    console.log('\n📊 Available databases:')
    console.log(databases)
    
    // Get current database
    const currentDb = await prisma.$queryRaw`SELECT DATABASE() as current_db`
    console.log('\n📌 Currently selected database:')
    console.log(currentDb)
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  } finally {
    await prisma.$disconnect()
  }
}

listDatabases()
