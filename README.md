* Install PostgreSQL

* Initialize DB
  1. Create PostgreSQL DB
    - CREATE DATABASE your_db_name
  2. Use created DB
    - psql -U your_user_name -d your_db_name
  3. Create tables
    - users
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL
        );
    - posts
        CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL
        );
    - tags
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL
        );
    - user_tags
        CREATE TABLE user_tags (
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
            PRIMARY KEY (user_id, tag_id)
        );
    - post_tags
        CREATE TABLE post_tags (
            post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
            tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
            PRIMARY KEY (post_id, tag_id)
        );

* Social Media Tagging API
This project provides an API for managing users, posts, and tags with many-to-many relationships between tags and users and tags and posts. The API is built using Node.js and PostgreSQL.

* Project Structure
social-media-tagging-api/
├── controllers/
│   ├── postController.js      # Controller for handling posts
│   ├── tagController.js       # Controller for handling tags
│   └── userController.js      # Controller for handling users
├── models/
│   ├── postModel.js           # Model for posts and database interactions
│   ├── tagModel.js            # Model for tags and relationships
│   └── userModel.js           # Model for users and database interactions
├── routes/
│   ├── postRoutes.js          # Routes for handling post-related requests
│   ├── tagRoutes.js           # Routes for handling tag-related requests
│   └── userRoutes.js          # Routes for handling user-related requests
├── .env                       # Environment variables (DB credentials, etc.)
├── app.js                     # Main Express app with route configurations
├── package.json               # Project metadata and dependencies
└── README.md                  # Project documentation

* Relationships:

1.Users to user_tags (One-to-Many):
  - A User can have multiple user_tags (i.e., a user can have multiple tags).
  - The user_tags table holds the user_id (Foreign Key) to link back to the Users table.
  - Each user_tag represents a unique combination of a user and a tag.

2.Tags to user_tags (One-to-Many):
  - A Tag can be associated with multiple user_tags (i.e., multiple users can share the same tag).
  - The user_tags table holds the tag_id (Foreign Key) to link back to the Tags table.

3.Users to Posts (One-to-Many): 
  - A User can create multiple Posts.
  - Each Post contains a foreign key user_id referencing the Users table.

4.Posts to posts_tags (One-to-Many):
  - A Post can have multiple posts_tags (i.e., a post can have multiple tags).
  - The posts_tags table holds the post_id (Foreign Key) to link back to the Posts table.

5.Tags to posts_tags (One-to-Many):
  - A Tag can be associated with multiple posts_tags (i.e., multiple posts can share the same tag).
  - The posts_tags table holds the tag_id (Foreign Key) to link back to the Tags table.

6.Posts to Tags (Many-to-Many):
  - The posts_tags table facilitates the many-to-many relationship between Posts and Tags.
  - A post can have multiple tags, and a tag can be assigned to multiple posts. The posts_tags table holds the combinations of post_id and tag_id.

7.Users to Tags (Many-to-Many via user_tags):
  - The user_tags table facilitates the many-to-many relationship between Users and Tags.
  - A user can be associated with multiple tags, and a tag can be used by multiple users.

* Entity Relationship Diagram (ERD)
  1.
  +-----------------+     +-----------------+     +-----------------+
  |     Users      |<---->|     Posts       |<---->|    Tags         |
  |-----------------|     |-----------------|     |-----------------|
  | id (PK)        |     | id (PK)         |     | id (PK)         |
  | name           |     | user_id (FK)    |     | name            |
  | email          |     | content         |     +-----------------+
  +-----------------+     +-----------------+            
  2.
  +-----------------+     +-----------------+     +-----------------+
  |     Users      |<---->|    user_tags    |<---->|    Tags         |
  |-----------------|     |-----------------|     |-----------------|
  | id (PK)        |     | user_id (FK)    |     | id (PK)         |
  | name           |     | tag_id (FK)     |     | name            |
  | email          |     +-----------------+     +-----------------+
  +-----------------+
  3.+-----------------+     +-----------------+     +-----------------+
  |     Posts      |<---->|   posts_tags    |<---->|    Tags         |
  |-----------------|     |-----------------|     |-----------------|
  | id (PK)        |     | post_id (FK)    |     | id (PK)         |
  | user_id (FK)   |     | tag_id (FK)     |     | name            |
  | content        |     +-----------------+     +-----------------+
  +-----------------+ 