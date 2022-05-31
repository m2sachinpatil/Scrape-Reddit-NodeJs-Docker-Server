const res = require('express/lib/response');
const sqlite3 = require('sqlite3');

// Intialize database and check required table is avaialble.
const db = new sqlite3.Database('./Database/ScraperDB.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

        db.run('CREATE TABLE "Post_Data" (\
                "id"	INTEGER NOT NULL,\
                "postTitle"	TEXT NOT NULL,\
                "photoPath"	TEXT,\
                "IsActive"	INTEGER NOT NULL,\
                "CreatedOn"	TEXT NOT NULL,\
                PRIMARY KEY("id" AUTOINCREMENT)\
            );', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
        });
    }
});


// GET single post SQLite 
async function GetPost(id) {
    try {
        return new Promise((resolve, reject) => {

            db.all("SELECT * FROM Post_Data where id = ?", [id], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(row ? row : null);

                }
            });
        });
    }
    catch (err) {
        console.error('inner', ex.message);
        throw err.message;
    }

}

// Get all post SQLite
async function GetPosts() {
    try {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM Post_Data where isActive = 1`;

            db.all(sql, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(row ? row : null);

                }
            });
        });

    }
    catch (err) {
        console.error('inner DB exception', ex.message);
        throw err.message;
    }
}

// Insert Post in SQLite
async function insertPost(postModel) {
    try {

        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Post_Data (postTitle, photoPath, IsActive, CreatedOn) VALUES (?,?,?,?)",
            [postModel.title, postModel.url, 1, new Date().toString()], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(row);

                }
            });
        });
    }
    catch (err) {
        console.error('inner', err.message);
        throw err.message;
    }
}

exports.GetPost = GetPost;
exports.GetPosts = GetPosts;
exports.insertPost = insertPost;
