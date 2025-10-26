// Direct MySQL connection test without Prisma schema
import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

async function testDirectConnection() {
  console.log('🔍 Testing direct MySQL connection...\n')
  
  const url = process.env.DATABASE_URL || ''
  console.log('Connection string:', url.replace(/:[^:@]+@/, ':****@'))
  
  // Parse connection string
  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  if (!match) {
    console.error('❌ Invalid DATABASE_URL format')
    return
  }
  
  const [, user, password, host, port, database] = match
  const decodedPassword = decodeURIComponent(password)
  
  console.log('\n📋 Connection details:')
  console.log('- Host:', host)
  console.log('- Port:', port)
  console.log('- User:', user)
  console.log('- Password:', '****')
  
  try {
    // Connect without specifying database
    console.log('\n🔌 Connecting to server...')
    const connection = await mysql.createConnection({
      host,
      port: parseInt(port),
      user,
      password: decodedPassword,
    })
    
    console.log('✅ Connected to MySQL server!\n')
    
    // List all databases
    const [databases] = await connection.query('SHOW DATABASES')
    console.log('📊 Available databases:')
    console.table(databases)
    
    // Check if our database exists
    const dbExists = (databases as any[]).some((db: any) => 
      db.Database === database || Object.values(db).includes(database)
    )
    
    if (dbExists) {
      console.log(`\n✅ Database "${database}" exists!`)
      
      // Connect to specific database
      await connection.changeUser({ database })
      console.log(`✅ Connected to database "${database}"`)
      
      // List tables
      const [tables] = await connection.query('SHOW TABLES')
      console.log('\n📋 Tables in database:')
      console.table(tables)
      
    } else {
      console.log(`\n⚠️ Database "${database}" does not exist`)
      console.log('Please create it or use one of the databases listed above')
    }
    
    await connection.end()
    console.log('\n✅ Disconnected')
    
  } catch (error) {
    console.error('\n❌ Connection failed:')
    if (error instanceof Error) {
      console.error('Error:', error.message)
      
      if (error.message.includes('Access denied')) {
        console.log('\n💡 Check username and password')
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
        console.log('\n💡 Check hostname and firewall settings')
      }
    }
  }
}

testDirectConnection()
