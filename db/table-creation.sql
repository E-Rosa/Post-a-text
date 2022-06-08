CREATE TABLE user_credentials (
    user_username VARCHAR(50) NOT NULL PRIMARY KEY,
    user_email VARCHAR(150) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL
);

CREATE TABLE all_tags(
    tag_id UUID NOT NULL PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL,
    tag_description VARCHAR(200)
);

CREATE TABLE all_posts (
    post_id UUID NOT NULL PRIMARY KEY,
    post_title VARCHAR(150) NOT NULL,
    post_body TEXT NOT NULL,
    post_tags_reference UUID REFERENCES all_tags(tag_id),
    post_author_reference VARCHAR(50) REFERENCES user_credentials(user_username)
);

CREATE TABLE user_info (
    username_reference VARCHAR(50) REFERENCES user_credentials(user_username) PRIMARY KEY,
    user_name VARCHAR(100),
    user_last_name VARCHAR(100),
    user_n_of_posts INTEGER,
    user_post_ids_reference UUID REFERENCES all_posts(post_id)
);

ALTER TABLE user_info ADD COLUMN user_following_reference VARCHAR(50) REFERENCES user_credentials(user_username);
ALTER TABLE user_info ADD COLUMN user_followers_reference VARCHAR(50) REFERENCES user_credentials(user_username);
ALTER TABLE user_info ADD COLUMN user_favorite_tags_reference VARCHAR(50) REFERENCES all_tags(tag_name);
ALTER TABLE user_info ADD COLUMN user_bio VARCHAR(150);


