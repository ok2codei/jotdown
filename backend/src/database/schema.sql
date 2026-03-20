CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.users (
 id SERIAL PRIMARY KEY,
 username VARCHAR(50) NOT NULL,
 email VARCHAR(100) UNIQUE NOT NULL,
 password TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS app.folders (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    name VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_folder_user
        FOREIGN KEY (user_id)
        REFERENCES app.users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS app.notes (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,
    folder_id INTEGER,

    title VARCHAR(255) NOT NULL,
    content TEXT,

    is_archived BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES app.users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (folder_id)
        REFERENCES app.folders(id)
        ON DELETE SET NULL
);



CREATE TABLE IF NOT EXISTS app.tags (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT fk_folder_user
        FOREIGN KEY (user_id)
        REFERENCES app.users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS app.note_tags (

    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,

    PRIMARY KEY (note_id, tag_id),

    FOREIGN KEY (note_id)
        REFERENCES app.notes(id)
        ON DELETE CASCADE,

    FOREIGN KEY (tag_id)
        REFERENCES app.tags(id)
        ON DELETE CASCADE
);

-- index for searching---
CREATE INDEX IF NOT EXISTS idx_notes_user
ON app.notes(user_id);

CREATE INDEX IF NOT EXISTS idx_note_tags_note
ON app.note_tags(note_id);

CREATE INDEX IF NOT EXISTS idx_note_tags_tag
ON app.note_tags(tag_id);
