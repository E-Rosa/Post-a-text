CREATE TABLE user_credentials (
    user_uid UUID NOT NULL PRIMARY KEY,
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
    post_author_reference UUID REFERENCES user_credentials(user_uid)
);

CREATE TABLE user_info (
    user_uid_reference UUID REFERENCES user_credentials(user_uid) PRIMARY KEY,
    user_name VARCHAR(100),
    user_last_name VARCHAR(100),
    user_n_of_posts INTEGER,
    user_post_ids_reference UUID REFERENCES all_posts(post_id)
);



