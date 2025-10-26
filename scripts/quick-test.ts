// Simple direct connection test
import mysql from 'mysql2/promise'

async function quickTest() {
  console.log('🔍 Quick database test...\n')
  
  const config = {
    host: 'mdawidahomestay.com',
    port: 3306,
    user: 'mdawidah_afribit',
    password: 'G5H1t_cAsvIA',
    database: 'mdawidah_afribit'
  }
  
  console.log('Config:', {
    ...config,
    password: '****'
  })
  
  try {
    const connection = await mysql.createConnection(config)
    console.log('\n✅ Connected successfully!')
    
    // Test query
    const [result] = await connection.query('SELECT DATABASE() as current_db, NOW() as server_time')
    console.log('\n📊 Server info:')
    console.table(result)
    
    // Show tables
    const [tables] = await connection.query('SHOW TABLES')
    console.log('\n📋 Tables in database:')
    if ((tables as any[]).length === 0) {
      console.log('  (No tables yet - database is empty)')
    } else {
      console.table(tables)
    }
    
    await connection.end()
    console.log('\n✅ Test successful!')
    
  } catch (error) {
    console.error('\n❌ Error:', error)
  }
}

quickTest()
