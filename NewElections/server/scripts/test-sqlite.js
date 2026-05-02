const Database = require('better-sqlite3');

let db;

try {
  db = new Database(':memory:');

  db.exec(`
    CREATE TABLE voters (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      district TEXT NOT NULL
    );
  `);

  const insert = db.prepare('INSERT INTO voters (name, district) VALUES (?, ?)');
  const selectByName = db.prepare('SELECT id, name, district FROM voters WHERE name = ?');

  const result = insert.run('Ada Lovelace', 'North District');
  const row = selectByName.get('Ada Lovelace');

  if (!result.changes || !row || row.name !== 'Ada Lovelace') {
    throw new Error('SQLite smoke test failed: unexpected insert/select result.');
  }

  console.log('SQLite smoke test passed.');
  console.log(`Inserted row id: ${result.lastInsertRowid}`);
  process.exitCode = 0;
} catch (error) {
  console.error('SQLite smoke test failed.');
  console.error(error);
  process.exitCode = 1;
} finally {
  if (db) {
    db.close();
  }
}
